import { Subscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscriber } from 'rxjs/Subscriber';
import { PrintZeroOperation } from '../operations/print-zero-operation';
import { MoveRightOperation } from '../operations/move-right-operation';
import { PrintOneOperation } from '../operations/print-one-operation';
import { MachineStatus } from '../machine-status';
import { Configuration } from '../configuration';
import { Square } from '../square';
import { Tape } from '../tape';
import { Algorithm } from '../algorithm';
import { DeepCopy } from '../deep-copy';

@Injectable()
export class OneThirdAlgorithmService implements Algorithm {
  public completed: boolean;
  public error: boolean;
  public break: boolean;
  public _subscription: Subscription;

  private defaultMaxIterations = 20;
  private deepCopy: DeepCopy;
  private defaultInitialTape: Tape;
  private actualStatus: MachineStatus;
  private configurations: Array<Configuration>;
  private continue: boolean;
  private machineStatus: BehaviorSubject<MachineStatus>;
  private initialTape: Tape;
  private configuration: Configuration;
  private i: number;

  constructor() {
    this.deepCopy = new DeepCopy();
    this.defaultInitialTape = this.createDefaultInitialTape();
    this.actualStatus = new MachineStatus(<Tape>this.deepCopy.apply(this.defaultInitialTape), 0);
    const firstConfiguration = new Configuration('b', '', [new PrintZeroOperation(), new MoveRightOperation()], 'c');
    const secondConfiguration = new Configuration('c', '', [new MoveRightOperation()], 'e');
    const thirdConfiguration = new Configuration('e', '', [new PrintOneOperation(), new MoveRightOperation()], 'f');
    const fourthConfiguration = new Configuration('f', '', [new MoveRightOperation()], 'b');
    this.configurations = [firstConfiguration, secondConfiguration, thirdConfiguration, fourthConfiguration];
  }

  public evolve(initialTape: Tape): Observable<MachineStatus> {
    this.init(initialTape);
    this.initialTape = initialTape;
    this.configuration = this.configurations[0];
    this.i = 0;
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

  public getDefaultInitialTape(): Tape {
    return this.defaultInitialTape;
  }

  public get subscription(): Subscription {
    return this._subscription;
  }

  public set subscription(newSubscription: Subscription) {
    this._subscription = newSubscription;
  }

  private createDefaultInitialTape(): Tape {
    const squares: Array<Square> = [];
    for (let i = 0; i < this.defaultMaxIterations; i++) {
      squares[i] = new Square(i + 1, '');
    }
    return new Tape(squares);
  }

  private algorithmEvolution(): void {
    this._subscription = Observable.interval(100).take(this.initialTape.squares.length + 1 - this.i).subscribe(res => {
      if (this.i < this.initialTape.squares.length && this.continue) {
        this.actualStatus = this.evolveConfiguration(this.configuration, this.actualStatus);
        if (this.error === false) {
          this.machineStatus.next(this.actualStatus);
          this.configuration = this.findConfigurationFrom(this.configuration.finalConfigurationName);
        }
        this.i++;
      } else {
        this.machineStatus.complete();
        this.completed = true;
      }
    });
  }

  private init(initialTape: Tape): void {
    this.completed = false;
    this.error = false;
    this.continue = true;
    this.break = false;
    this.actualStatus = new MachineStatus(<Tape>this.deepCopy.apply(initialTape), 0);
    this.machineStatus = new BehaviorSubject(this.actualStatus);
  }

  private findConfigurationFrom(name: string): Configuration {
    let index: number = -1;
    for (let i = 0; i < this.configurations.length; i++) {
      if (this.configurations[i].name === name) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      return this.configurations[index];
    }
    throw Error('Cannot find configuration with name ' + name);
  }

  private evolveConfiguration(configuration: Configuration, machineStatus: MachineStatus) {
    try {
      return configuration.evolve(machineStatus);
    } catch (e) {
      this.completed = true;
      this.error = true;
      this.continue = false;
    }
  }

}
