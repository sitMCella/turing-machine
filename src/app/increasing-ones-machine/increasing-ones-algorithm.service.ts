import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Algorithm } from '../algorithm';
import { AlgorithmEvolutionService } from '../algorithm-evolution.service';
import { PrintZeroOperation } from '../operations/print-zero-operation';
import { MoveLeftOperation } from '../operations/move-left-operation';
import { MoveRightOperation } from '../operations/move-right-operation';
import { PrintOneOperation } from '../operations/print-one-operation';
import { PrintSchwaOperation } from '../operations/print-schwa-operation';
import { PrintXOperation } from '../operations/print-x-operation';
import { EraseOperation } from '../operations/erase-operation';
import { Configuration } from '../configuration';
import { MachineStatus } from '../machine-status';
import { Square } from '../square';
import { Tape } from '../tape';
import { TapeSymbol } from '../tape-symbol';

@Injectable()
export class IncreasingOnesAlgorithmService implements Algorithm {
  private defaultMaxIterations = 12;
  private defaultInitialTape: Tape;
  private configurations: Array<Configuration>;

  constructor(private algorithmEvolutionService: AlgorithmEvolutionService) {
    this.defaultInitialTape = this.createDefaultInitialTape();
    const firstConfiguration = new Configuration('b', new TapeSymbol(TapeSymbol.NONE),
      [new PrintSchwaOperation(), new MoveRightOperation(), new PrintSchwaOperation(),
      new MoveRightOperation(), new PrintZeroOperation(), new MoveRightOperation(),
      new MoveRightOperation(), new PrintZeroOperation(), new MoveLeftOperation(),
      new MoveLeftOperation()], 'o');
    const secondConfiguration = new Configuration('o', new TapeSymbol(TapeSymbol.ONE),
      [new MoveRightOperation(), new PrintXOperation(), new MoveLeftOperation(),
      new MoveLeftOperation(), new MoveLeftOperation()], 'o');
    const thirdConfiguration = new Configuration('o', new TapeSymbol(TapeSymbol.ZERO), [], 'q');
    const fourthConfiguration = new Configuration('q', new TapeSymbol(TapeSymbol.ANY),
      [new MoveRightOperation(), new MoveRightOperation()], 'q');
    const fifthConfiguration = new Configuration('q', new TapeSymbol(TapeSymbol.NONE),
      [new PrintOneOperation(), new MoveLeftOperation()], 'p');
    const sixthConfiguration = new Configuration('p', new TapeSymbol(TapeSymbol.X),
      [new EraseOperation(), new MoveRightOperation()], 'q');
    const seventhConfiguration = new Configuration('p', new TapeSymbol(TapeSymbol.SCHWA), [new MoveRightOperation()], 'f');
    const eightConfiguration = new Configuration('p', new TapeSymbol(TapeSymbol.NONE),
      [new MoveLeftOperation(), new MoveLeftOperation()], 'p');
    const ninthConfiguration = new Configuration('f', new TapeSymbol(TapeSymbol.ANY),
      [new MoveRightOperation(), new MoveRightOperation()], 'f');
    const tenthConfiguration = new Configuration('f', new TapeSymbol(TapeSymbol.NONE),
      [new PrintZeroOperation(), new MoveLeftOperation(), new MoveLeftOperation()], 'o');

    this.configurations = [firstConfiguration, secondConfiguration, thirdConfiguration,
      fourthConfiguration, fifthConfiguration, sixthConfiguration, seventhConfiguration,
      eightConfiguration, ninthConfiguration, tenthConfiguration];
  }

  public getFirstConfiguration(): Configuration {
    return this.configurations[0];
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
      squares[i] = new Square(i + 1, new TapeSymbol(TapeSymbol.NONE));
    }
    return new Tape(squares);
  }

}
