import { DeepCopy } from './deep-copy';
import { MachineStatus } from './machine-status';
import { Operation } from './operation';

export class Configuration {
  public name: string;
  public simbol: string;
  public operations: Array<Operation>;
  public finalConfigurationName: string;

  constructor(name: string, simbol: string, operations: Array<Operation>, finalConfigurationName: string) {
    this.name = name;
    this.simbol = simbol;
    this.operations = operations;
    this.finalConfigurationName = finalConfigurationName;
  }

  public evolve(machineStatus: MachineStatus): MachineStatus {
    if (machineStatus.symbol !== this.simbol) {
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
