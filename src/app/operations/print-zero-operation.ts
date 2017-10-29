import { DeepCopy } from '../deep-copy';
import { Operation } from '../operation';
import { MachineStatus } from '../machine-status';

export class PrintZeroOperation implements Operation {

  apply(machineStatus: MachineStatus): MachineStatus {
    if (machineStatus.symbol !== '') {
      throw new Error('Tape already contains a symbol in current index');
    }
    machineStatus.symbol = '0';
    return machineStatus;
  }

}
