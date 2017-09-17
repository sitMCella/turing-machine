import { DeepCopy } from '../deep-copy';
import { Operation } from '../operation';
import { MachineStatus } from '../machine-status';

export class PrintOneOperation implements Operation {

    apply(machineStatus: MachineStatus): MachineStatus {
        machineStatus.tape.squares[machineStatus.index].value = '1';
        return machineStatus;
    }

}
