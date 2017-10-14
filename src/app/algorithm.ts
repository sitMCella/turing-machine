import { Observable } from 'rxjs/Observable';
import { MachineStatus } from './machine-status';
import { Tape } from './tape';

export interface Algorithm {
    readonly machineStatusObservable: Observable<MachineStatus>;
    completed: boolean;
    error: boolean;

    getDefaultInitialTape(): Tape;
    evolve(initialTape: Tape): void;
    stop(): void;
}
