import { Injectable } from '@angular/core';

import { PrintZeroOperation } from '../operations/print-zero-operation';
import { MoveRightOperation } from '../operations/move-right-operation';
import { PrintOneOperation } from '../operations/print-one-operation';
import { MachineStatus } from '../machine-status';
import { Configuration } from '../configuration';
import { Square } from '../square';
import { Tape } from '../tape';

export class OneThirdAlgorithmService {

  private configurations: Array<Configuration>;
  private maxSquareCount = 20;
  private machineStatus: Array<MachineStatus> = [];

  constructor() {
    const squares: Array<Square> = [];
    for (let i = 0; i < this.maxSquareCount; i++) {
      squares[i] = new Square(i + 1, '');
    }
    const initialTape: Tape = new Tape(squares);
    this.machineStatus[0] = new MachineStatus(initialTape, 0);
    const firstConfiguration = new Configuration('b', '', [new PrintZeroOperation(), new MoveRightOperation()], 'c');
    const secondConfiguration = new Configuration('c', '', [new MoveRightOperation()], 'e');
    const thirdConfiguration = new Configuration('e', '', [new PrintOneOperation(), new MoveRightOperation()], 'f');
    const fourthConfiguration = new Configuration('f', '', [new MoveRightOperation()], 'b');
    this.configurations = [firstConfiguration, secondConfiguration, thirdConfiguration, fourthConfiguration];
  }

  public getFirstMachineStatus(): MachineStatus {
    return this.machineStatus[0];
  }

  public evolve(): Array<MachineStatus> {
    let configuration: Configuration = this.configurations[0];
    for (let i = 1; i < this.maxSquareCount; i++) {
      this.machineStatus[i] = configuration.evolve(this.machineStatus[i - 1]);
      configuration = this.findConfigurationFrom(configuration.finalConfigurationName);
    }
    return this.machineStatus;
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
