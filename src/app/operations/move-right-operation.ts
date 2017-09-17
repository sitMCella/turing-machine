import { DeepCopy } from '../deep-copy';
import { Operation } from '../operation';
import { MachineStatus } from '../machine-status';

export class MoveRightOperation implements Operation {

    apply(machineStatus: MachineStatus): MachineStatus {
        machineStatus.index++;
        return machineStatus;
    }

}
