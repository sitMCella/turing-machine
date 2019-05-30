import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Observable, BehaviorSubject, Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MachineStatus } from '../machine-status';
import { Tape } from '../tape';
import { Square } from '../square';
import { TapeSymbol } from '../tape-symbol';
import { DeepCopy } from '../deep-copy';
import { Algorithm } from '../algorithm';
import { IntervalService } from '../interval.service';

@Component({
  selector: 'app-tape',
  templateUrl: './tape.component.html',
  styleUrls: ['./tape.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TapeComponent implements OnInit, OnDestroy {

  @Input()
  public algorithm: Algorithm;
  public initialTape: Tape;
  public squaresCount: number;
  public machineStatusObservable: Observable<MachineStatus[]>;

  private subscription: Subscription;
  private subject: BehaviorSubject<MachineStatus[]>;
  private finished: boolean;
  private machineStatus: MachineStatus[];
  private notifier: Subject<boolean>;
  private intervalSubscription: Subscription;

  constructor(private intervalService: IntervalService) {
    this.notifier = new Subject<boolean>();
  }

  ngOnInit() {
    const deepCopy: DeepCopy = new DeepCopy();
    this.initialTape = <Tape>deepCopy.apply(this.algorithm.getDefaultInitialTape());
    this.init();
    this.evolveAlgorithm();
  }

  ngOnDestroy() {
    this.notifier.next(true);
    this.notifier.complete();
    this.notifier.unsubscribe();
    if (this.algorithm) {
      this.algorithm.stop();
    }
    if (this.subject) {
      this.subject.unsubscribe();
    }
    this.stopTimer();
  }

  public changeInitialTapeSize(): void {
    const deepCopy: DeepCopy = new DeepCopy();
    const squares: Array<Square> = [];
    const size: number = this.squaresCount < this.initialTape.squares.length ? this.squaresCount : this.initialTape.squares.length;
    for (let i = 0; i < size; i++) {
      squares.push(<Square>deepCopy.apply(this.initialTape.squares[i]));
    }
    if (this.squaresCount > this.initialTape.squares.length) {
      for (let i = size; i < this.squaresCount; i++) {
        squares.push(new Square(i + 1, new TapeSymbol(TapeSymbol.NONE)));
      }
    }
    const anotherInitialTape: Tape = new Tape(squares);
    this.initialTape = anotherInitialTape;
  }

  public evolve(): void {
    this.init();
    this.evolveAlgorithm();
  }

  public stop(): void {
    this.algorithm.stop();
    this.stopTimer();
    this.subscription.unsubscribe();
  }

  public pause(): void {
    this.algorithm.pause();
    this.stopTimer();
  }

  public resume(): void {
    this.algorithm.resume();
    this.startTimer();
  }

  private init(): void {
    this.stopTimer();
    this.startTimer();
    this.finished = false;
    this.machineStatus = [];
    this.subject = new BehaviorSubject([]);
    this.machineStatusObservable = this.subject.asObservable();
  }

  private evolveAlgorithm(): void {
    this.subscription = this.algorithm.evolve(this.initialTape)
    .pipe(takeUntil(this.notifier))
    .subscribe(
      (value) => {
        this.machineStatus.push(value);
      },
      (error) => {
        this.clearAlgorithmStatus();
      },
      () => this.clearAlgorithmStatus()
    );
  }

  private clearAlgorithmStatus(): void {
    this.finished = true;
    this.algorithm.subscription.unsubscribe();
    this.stopTimer();
  }

  private startTimer(): void {
    this.intervalService.setInterval(500);
    this.intervalSubscription = this.intervalService.subscribe(() => {
      if (this.subject) {
        if (!this.finished) {
          this.subject.next(this.machineStatus);
        } else {
          this.subject.next(this.machineStatus);
          this.subject.complete();
        }
      }
    });
  }

  private stopTimer(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
    if (this.intervalService) {
      this.intervalService.clear();
    }
    if (this.subject && this.finished && (!this.subject.closed || !this.subject.isStopped)) {
      this.subject.next(this.machineStatus);
      this.subject.complete();
    }
  }

}
