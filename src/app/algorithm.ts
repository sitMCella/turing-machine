import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { MachineStatus } from './machine-status';
import { Tape } from './tape';

export interface Algorithm {
    completed: boolean;
    error: boolean;
    subscription: Subscription;

    getDefaultInitialTape(): Tape;
    evolve(initialTape: Tape): Observable<MachineStatus>;
    stop(): void;
    pause(): void;
    resume(): void;
}
