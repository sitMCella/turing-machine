import { Injectable } from '@angular/core';
import { interval, Subscription, Observable, BehaviorSubject } from 'rxjs';
import { MachineStatus } from './machine-status';
import { Configuration } from './configuration';
import { Tape } from './tape';
import { DeepCopy } from './deep-copy';
import { TapeSymbolCompare } from './tape-symbol-compare';

@Injectable()
export class AlgorithmEvolutionService {
  public completed: boolean;
  public error: boolean;
  public errorMessage: string;
  public break: boolean;
  public _subscription: Subscription;

  private deepCopy: DeepCopy;
  private tapeSymbolCompare: TapeSymbolCompare;
  private actualStatus: MachineStatus;
  private configurations: Array<Configuration>;
  private continue: boolean;
  private machineStatus: BehaviorSubject<MachineStatus>;
  private configuration: Configuration;
  private i: number;

  constructor() {
    this.deepCopy = new DeepCopy();
    this.tapeSymbolCompare = new TapeSymbolCompare();
  }

  public evolve(configurations: Array<Configuration>, initialTape: Tape): Observable<MachineStatus> {
    this.i = 0;
    this.init(configurations, initialTape);
    this.algorithmEvolution();
    return this.machineStatus.asObservable();
  }

  public stop(): void {
    this.continue = false;
    this.completed = true;
    this.machineStatus.complete();
    this._subscription.unsubscribe();
  }

  public pause(): void {
    this.break = true;
    this._subscription.unsubscribe();
  }

  public resume(): void {
    this.break = false;
    this.algorithmEvolution();
  }

  public get subscription(): Subscription {
    return this._subscription;
  }

  public set subscription(newSubscription: Subscription) {
    this._subscription = newSubscription;
  }

  private init(configurations: Array<Configuration>, initialTape: Tape): void {
    this.configuration = configurations[0];
    this.configurations = configurations;
    this.completed = false;
    this.error = false;
    this.errorMessage = '';
    this.continue = true;
    this.break = false;
    this.actualStatus = new MachineStatus(this.configuration.name, <Tape>this.deepCopy.apply(initialTape), 0);
    this.machineStatus = new BehaviorSubject(this.actualStatus);
  }

  private algorithmEvolution(): void {
    this._subscription = interval(100).subscribe(res => {
      if (this.continue) {
        this.algorithmConfigurationEvolution();
        this.i++;
      } else {
        this.machineStatus.complete();
        this.completed = true;
      }
    });
  }

  private algorithmConfigurationEvolution(): void {
    try {
      if (this.actualStatus.maxSquareCount()) {
        throw Error('Max tape length reached');
      }
      this.actualStatus = this.configuration.evolve(this.actualStatus);
      if (this.error === false) {
        this.machineStatus.next(this.actualStatus);
        this.configuration = this.findConfigurationFrom(this.configuration.finalConfigurationName, this.actualStatus);
      }
    } catch (e) {
      this.handleException(e);
    }
  }

  private findConfigurationFrom(name: string, actualStatus: MachineStatus): Configuration {
    if (actualStatus.maxSquareCount()) {
      throw Error('Max tape length reached');
    }
    let index = -1;
    for (let i = 0; i < this.configurations.length; i++) {
      if (this.configurations[i].name === name
        && this.tapeSymbolCompare.compare(actualStatus.symbol, this.configurations[i].symbol)) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      return this.configurations[index];
    }
    throw Error('Cannot find m-configuration with name ' + name + ' and symbol ' + actualStatus.symbol.value);
  }

  private handleException(e: Error): void {
    this.completed = true;
    this.error = true;
    this.errorMessage = e.message;
    this.continue = false;
  }

}
