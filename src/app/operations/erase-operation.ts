import { Operation } from "../operation";
import { MachineStatus } from "../machine-status";
import { TapeSymbol } from "../tape-symbol";

export class EraseOperation implements Operation {
  apply(machineStatus: MachineStatus): MachineStatus {
    machineStatus.symbol = new TapeSymbol(TapeSymbol.NONE);
    return machineStatus;
  }
}
