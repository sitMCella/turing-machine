import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Algorithm } from '../algorithm';
import { AlgorithmEvolutionService } from '../algorithm-evolution.service';
import { PrintZeroOperation } from '../operations/print-zero-operation';
import { MoveRightOperation } from '../operations/move-right-operation';
import { PrintOneOperation } from '../operations/print-one-operation';
import { Configuration } from '../configuration';
import { MachineStatus } from '../machine-status';
import { Square } from '../square';
import { Tape } from '../tape';

@Injectable()
export class OneThirdAlgorithmService implements Algorithm {
  private defaultMaxIterations = 20;
  private defaultInitialTape: Tape;
  private configurations: Array<Configuration>;

  constructor(private algorithmEvolutionService: AlgorithmEvolutionService) {
    this.defaultInitialTape = this.createDefaultInitialTape();
    const firstConfiguration = new Configuration('b', '', [new PrintZeroOperation(), new MoveRightOperation()], 'c');
    const secondConfiguration = new Configuration('c', '', [new MoveRightOperation()], 'e');
    const thirdConfiguration = new Configuration('e', '', [new PrintOneOperation(), new MoveRightOperation()], 'f');
    const fourthConfiguration = new Configuration('f', '', [new MoveRightOperation()], 'b');
    this.configurations = [firstConfiguration, secondConfiguration, thirdConfiguration, fourthConfiguration];
  }

  public getDefaultInitialTape(): Tape {
    return this.defaultInitialTape;
  }

  public evolve(initialTape: Tape): Observable<MachineStatus> {
    return this.algorithmEvolutionService.evolve(this.configurations, initialTape);
  }

  public stop(): void {
    this.algorithmEvolutionService.stop();
  }

  public pause(): void {
    this.algorithmEvolutionService.pause();
  }

  public resume(): void {
    this.algorithmEvolutionService.resume();
  }

  public get completed(): boolean {
    return this.algorithmEvolutionService.completed;
  }

  public get error(): boolean {
    return this.algorithmEvolutionService.error;
  }

  public get errorMessage(): string {
    return this.algorithmEvolutionService.errorMessage;
  }

  public get break(): boolean {
    return this.algorithmEvolutionService.break;
  }

  public get subscription(): Subscription {
    return this.algorithmEvolutionService.subscription;
  }

  public set subscription(newSubscription: Subscription) {
    this.algorithmEvolutionService.subscription = newSubscription;
  }

  private createDefaultInitialTape(): Tape {
    const squares: Array<Square> = [];
    for (let i = 0; i < this.defaultMaxIterations; i++) {
      squares[i] = new Square(i + 1, '');
    }
    return new Tape(squares);
  }

}
