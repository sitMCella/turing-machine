import { Subscription, Observable } from 'rxjs';
import { Configuration } from './configuration';
import { Tape } from './tape';
import { MachineStatus } from './machine-status';

export interface Algorithm {
  completed: boolean;
  error: boolean;
  errorMessage: string;
  break: boolean;
  subscription: Subscription;

  getFirstConfiguration(): Configuration;
  getDefaultInitialTape(): Tape;
  evolve(initialTape: Tape): Observable<MachineStatus>;
  stop(): void;
  pause(): void;
  resume(): void;
}
