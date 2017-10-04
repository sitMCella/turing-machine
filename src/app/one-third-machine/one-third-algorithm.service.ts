import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PrintZeroOperation } from '../operations/print-zero-operation';
import { MoveRightOperation } from '../operations/move-right-operation';
import { PrintOneOperation } from '../operations/print-one-operation';
import { MachineStatus } from '../machine-status';
import { Configuration } from '../configuration';
import { Square } from '../square';
import { Tape } from '../tape';

export class OneThirdAlgorithmService {
  public readonly machineStatusObservable: Observable<MachineStatus>;
  public completed: boolean;

  private defaultMaxIterations = 20;
  private maxIterations;
  private defaultInitialTape: Tape;
  private actualStatus: MachineStatus;
  private machineStatus: BehaviorSubject<MachineStatus>;
  private configurations: Array<Configuration>;
  private continue: boolean;

  constructor() {
    this.maxIterations = this.defaultMaxIterations;
    this.defaultInitialTape = this.createDefaultInitialTape();
    const initialTape: Tape = this.defaultInitialTape;
    this.actualStatus = new MachineStatus(initialTape, 0);
    this.machineStatus = new BehaviorSubject(this.actualStatus);
    this.machineStatusObservable = this.machineStatus.asObservable();
    this.machineStatus.next(this.actualStatus);
    const firstConfiguration = new Configuration('b', '', [new PrintZeroOperation(), new MoveRightOperation()], 'c');
    const secondConfiguration = new Configuration('c', '', [new MoveRightOperation()], 'e');
    const thirdConfiguration = new Configuration('e', '', [new PrintOneOperation(), new MoveRightOperation()], 'f');
    const fourthConfiguration = new Configuration('f', '', [new MoveRightOperation()], 'b');
    this.configurations = [firstConfiguration, secondConfiguration, thirdConfiguration, fourthConfiguration];
    this.continue = true;
    this.completed = false;
  }

  public evolve(): void {
    let configuration: Configuration = this.configurations[0];
    for (let i = 1; i < this.maxIterations && this.continue; i++) {
      this.actualStatus = configuration.evolve(this.actualStatus);
      this.machineStatus.next(this.actualStatus);
      configuration = this.findConfigurationFrom(configuration.finalConfigurationName);
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

}
