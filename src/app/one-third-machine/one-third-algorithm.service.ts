import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PrintZeroOperation } from '../operations/print-zero-operation';
import { MoveRightOperation } from '../operations/move-right-operation';
import { PrintOneOperation } from '../operations/print-one-operation';
import { MachineStatus } from '../machine-status';
import { Configuration } from '../configuration';
import { Square } from '../square';
import { Tape } from '../tape';
import { Algorithm } from '../algorithm';
import { DeepCopy } from '../deep-copy';

export class OneThirdAlgorithmService implements Algorithm {
  public readonly machineStatusObservable: Observable<MachineStatus>;
  public completed: boolean;
  public error: boolean;

  private defaultMaxIterations = 20;
  private deepCopy: DeepCopy;
  private _maxIterations;
  private defaultInitialTape: Tape;
  private actualStatus: MachineStatus;
  private machineStatus: Subject<MachineStatus>;
  private configurations: Array<Configuration>;
  private continue: boolean;

  constructor() {
    this.completed = false;
    this.error = false;
    this.deepCopy = new DeepCopy();
    this._maxIterations = this.defaultMaxIterations;
    this.defaultInitialTape = this.createDefaultInitialTape();
    this.machineStatus = new Subject();
    this.machineStatusObservable = this.machineStatus.asObservable();
    const firstConfiguration = new Configuration('b', '', [new PrintZeroOperation(), new MoveRightOperation()], 'c');
    const secondConfiguration = new Configuration('c', '', [new MoveRightOperation()], 'e');
    const thirdConfiguration = new Configuration('e', '', [new PrintOneOperation(), new MoveRightOperation()], 'f');
    const fourthConfiguration = new Configuration('f', '', [new MoveRightOperation()], 'b');
    this.configurations = [firstConfiguration, secondConfiguration, thirdConfiguration, fourthConfiguration];
    this.continue = true;
  }

  public get maxIterations(): number {
    return this._maxIterations;
  }

  public set maxIterations(newMaxIterations: number) {
    this._maxIterations = newMaxIterations;
  }

  public evolve(initialTape: Tape): void {
    this.completed = false;
    this.error = false;
    this.continue = true;
    this.actualStatus = new MachineStatus(<Tape>this.deepCopy.apply(initialTape), 0);
    this.machineStatus.next(this.actualStatus);
    let configuration: Configuration = this.configurations[0];
    for (let i = 1; i < this._maxIterations && this.continue; i++) {
      this.actualStatus = this.evolveConfiguration(configuration, this.actualStatus);
      if (this.error === false) {
        this.machineStatus.next(this.actualStatus);
        configuration = this.findConfigurationFrom(configuration.finalConfigurationName);
      }
    }
    this.completed = true;
  }

  public stop(): void {
    this.continue = false;
  }

  public getDefaultInitialTape(): Tape {
    return this.defaultInitialTape;
  }

  private createDefaultInitialTape(): Tape {
    const squares: Array<Square> = [];
    for (let i = 0; i < this.defaultMaxIterations; i++) {
      squares[i] = new Square(i + 1, '');
    }
    return new Tape(squares);
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
    }
  }

}
