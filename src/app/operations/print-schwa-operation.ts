import { DeepCopy } from '../deep-copy';
import { Operation } from '../operation';
import { MachineStatus } from '../machine-status';
import { TapeSymbol } from '../tape-symbol';

export class PrintSchwaOperation implements Operation {

  apply(machineStatus: MachineStatus): MachineStatus {
    if (machineStatus.symbol.value !== TapeSymbol.NONE) {
      throw new Error('Tape already contains a symbol in current index');
    }
    machineStatus.symbol = new TapeSymbol(TapeSymbol.SCHWA);
    return machineStatus;
  }

}
