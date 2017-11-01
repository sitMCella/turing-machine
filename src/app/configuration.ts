import { DeepCopy } from './deep-copy';
import { MachineStatus } from './machine-status';
import { Operation } from './operation';

export class Configuration {
  public name: string;
  public symbol: string;
  public operations: Array<Operation>;
  public finalConfigurationName: string;

  constructor(name: string, symbol: string, operations: Array<Operation>, finalConfigurationName: string) {
    this.name = name;
    this.symbol = symbol;
    this.operations = operations;
    this.finalConfigurationName = finalConfigurationName;
  }

  public evolve(machineStatus: MachineStatus): MachineStatus {
    if (machineStatus.symbol !== this.symbol) {
      throw new Error('Cannot apply the configuration on given machine status');
    }
    const deepCopy: DeepCopy = new DeepCopy();
    let finalMachineStatus: MachineStatus = <MachineStatus>deepCopy.apply(machineStatus);
    this.operations.forEach(operation => {
      finalMachineStatus = operation.apply(finalMachineStatus);
    });
    return finalMachineStatus;
  }

}
