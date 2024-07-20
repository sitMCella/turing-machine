import { DeepCopy } from "./deep-copy";
import { MachineStatus } from "./machine-status";
import { Operation } from "./operation";
import { TapeSymbol } from "./tape-symbol";

export class Configuration {
  public name: string;
  public symbol: TapeSymbol;
  public operations: Array<Operation>;
  public finalConfigurationName: string;

  constructor(
    name: string,
    symbol: TapeSymbol,
    operations: Array<Operation>,
    finalConfigurationName: string,
  ) {
    this.name = name;
    this.symbol = symbol;
    this.operations = operations;
    this.finalConfigurationName = finalConfigurationName;
  }

  public evolve(machineStatus: MachineStatus): MachineStatus {
    const deepCopy: DeepCopy = new DeepCopy();
    let finalMachineStatus: MachineStatus = <MachineStatus>(
      deepCopy.apply(machineStatus)
    );
    this.operations.forEach((operation) => {
      finalMachineStatus = operation.apply(finalMachineStatus);
    });
    finalMachineStatus.configurationName = this.finalConfigurationName;
    return finalMachineStatus;
  }
}
