import { Operation } from "../operation";
import { MachineStatus } from "../machine-status";

export class MoveLeftOperation implements Operation {
  apply(machineStatus: MachineStatus): MachineStatus {
    machineStatus.index--;
    return machineStatus;
  }
}
