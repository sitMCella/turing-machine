import { MachineStatus } from './machine-status';

export interface Operation {
    apply(machineStatus: MachineStatus): MachineStatus;
}
