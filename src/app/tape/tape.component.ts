import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OneThirdAlgorithmService } from '../one-third-machine/one-third-algorithm.service';
import { MachineStatus } from '../machine-status';
import { Tape } from '../tape';
import { Square } from '../square';
import { DeepCopy } from '../deep-copy';
import { Algorithm } from '../algorithm';
import { IntervalService } from '../interval.service';

@Component({
  selector: 'app-tape',
  templateUrl: './tape.component.html',
  styleUrls: ['./tape.component.css'],
})
export class TapeComponent implements OnInit, OnDestroy {

  @Input()
  public algorithm: Algorithm;
  public initialTape: Tape;
  public squaresCount: number;
  public machineStatusObservable: Observable<MachineStatus[]>;

  private subscription: Subscription;
  private subject: BehaviorSubject<MachineStatus[]>;
  private anyErrors: boolean;
  private finished: boolean;
  public machineStatus: MachineStatus[];

  constructor(private intervalService: IntervalService) {
  }

  ngOnInit() {
    const deepCopy: DeepCopy = new DeepCopy();
    this.initialTape = <Tape>deepCopy.apply(this.algorithm.getDefaultInitialTape());
    this.init();
    this.evolveAlgorithm();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
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
        squares.push(new Square(i + 1, ''));
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
    this.anyErrors = false;
    this.machineStatus = [];
    this.subject = new BehaviorSubject([]);
    this.machineStatusObservable = this.subject.asObservable();
  }

  private evolveAlgorithm(): void {
    this.subscription = this.algorithm.evolve(this.initialTape).subscribe(
      (value) => {
        this.machineStatus.push(value);
      },
      (error) => {
        this.anyErrors = true;
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
    this.intervalService.setInterval(() => {
      if (this.subject) {
        if (!this.finished) {
          this.subject.next(this.machineStatus);
        } else {
          this.subject.next(this.machineStatus);
          this.subject.complete();
        }
      }
    }, 500);
  }

  private stopTimer(): void {
    this.intervalService.clear();
    if (this.subject && this.finished && (!this.subject.closed || !this.subject.isStopped)) {
      this.subject.next(this.machineStatus);
      this.subject.complete();
    }
  }

}
