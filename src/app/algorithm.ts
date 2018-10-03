import { Subscription, Observable } from 'rxjs';
import { MachineStatus } from './machine-status';
import { Tape } from './tape';

export interface Algorithm {
  completed: boolean;
  error: boolean;
  errorMessage: string;
  break: boolean;
  subscription: Subscription;

  getDefaultInitialTape(): Tape;
  evolve(initialTape: Tape): Observable<MachineStatus>;
  stop(): void;
  pause(): void;
  resume(): void;
}
