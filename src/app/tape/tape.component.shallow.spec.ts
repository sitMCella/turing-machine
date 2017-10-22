import { async, ComponentFixture, TestBed, inject, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { TapeComponent } from './tape.component';
import { Tape } from '../tape';
import { Square } from '../square';
import { MachineStatus } from '../machine-status';
import { OneThirdAlgorithmService } from '../one-third-machine/one-third-algorithm.service';
import { Algorithm } from '../algorithm';
import { DeepCopy } from '../deep-copy';
import { IntervalService } from '../interval.service';

describe('TapeComponent', () => {
  let component: TapeComponent;
  let fixture: ComponentFixture<TapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TapeComponent],
      imports: [FormsModule],
      providers: [IntervalService]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TapeComponent);
    component = fixture.componentInstance;
    component.algorithm = new AlgorithmService();
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the default initial tape', () => {
    const compiled = fixture.debugElement.nativeElement;
    const initialTape: HTMLElement = compiled.querySelector('.initial-tape');
    expect(initialTape).not.toBeNull();
    expect(initialTape).toBeDefined();
  });

  it('should contain the default initial tape with 2 squares', () => {
    const compiled = fixture.debugElement.nativeElement;
    const squares: Array<HTMLElement> = compiled.querySelectorAll('.initial-tape .square');
    expect(squares).not.toBeNull();
    expect(squares).toBeDefined();
    expect(squares.length).toBe(2);
  });

  it('should contain the evolve button', () => {
    const compiled = fixture.debugElement.nativeElement;
    const stopButton: HTMLButtonElement = compiled.querySelector('.evolve');
    expect(stopButton).not.toBeNull();
    expect(stopButton).toBeDefined();
  });

  it('should contain the stop button', () => {
    const compiled = fixture.debugElement.nativeElement;
    const stopButton: HTMLButtonElement = compiled.querySelector('.stop');
    expect(stopButton).not.toBeNull();
    expect(stopButton).toBeDefined();
  });

  it('should evolve algorithm with default initial tape', fakeAsync(() => {
    tick(1000);
    discardPeriodicTasks();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const tapes: Array<HTMLElement> = compiled.querySelectorAll('.tape');
    expect(tapes).not.toBeNull();
    expect(tapes).toBeDefined();
    expect(tapes.length).toEqual(2);
  }));

  describe('evolve button', () => {

    it('should  evolve algorithm with default initial tape', fakeAsync(() => {
      tick(1000);
      discardPeriodicTasks();
      const compiled: any = fixture.debugElement.nativeElement;
      const evolveButton: HTMLButtonElement = compiled.querySelector('.evolve');

      evolveButton.click();
      fixture.detectChanges();
      tick(1000);
      discardPeriodicTasks();
      fixture.detectChanges();

      const tapes: Array<any> = compiled.querySelectorAll('.tape');
      expect(tapes).not.toBeNull();
      expect(tapes).toBeDefined();
      expect(tapes.length).toBe(2);
      const secondTapeSquares: Array<HTMLElement> = tapes[1].querySelectorAll('.square');
      expect(secondTapeSquares[0].innerText).toBe('');
      expect(secondTapeSquares[1].innerText).toBe('A');
    }));

    it('should evolve algorithm with modified initial tape', fakeAsync(() => {
      tick(1000);
      discardPeriodicTasks();
      const compiled: any = fixture.debugElement.nativeElement;
      const squares: Array<HTMLElement> = compiled.querySelectorAll('.initial-tape .square');
      const firstSquareInitialTape: HTMLInputElement = squares[0].querySelector('input');
      firstSquareInitialTape.value = 'A';
      firstSquareInitialTape.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const evolveButton: HTMLButtonElement = compiled.querySelector('.evolve');
        evolveButton.click();
        fixture.detectChanges();
        tick(1000);
        discardPeriodicTasks();
        fixture.detectChanges();

        const tapes: Array<any> = compiled.querySelectorAll('.tape');
        expect(tapes).not.toBeNull();
        expect(tapes).toBeDefined();
        expect(tapes.length).toBe(2);
        const secondTapeSquares: Array<HTMLElement> = tapes[1].querySelectorAll('.square');
        expect(secondTapeSquares[0].innerText).toBe('A');
        expect(secondTapeSquares[1].innerText).toBe('B');
      });
    }));

  });

  describe('stop button', () => {

    it('should stop algorithm evolution', async(() => {
      const compiled: any = fixture.debugElement.nativeElement;
      const stopButton: HTMLButtonElement = compiled.querySelector('.stop');

      stopButton.click();
      fixture.detectChanges();

      const tapes: Array<HTMLElement> = compiled.querySelectorAll('.tape');
      expect(tapes).not.toBeNull();
      expect(tapes).toBeDefined();
      expect(tapes.length).toBeLessThanOrEqual(2);
    }));

  });

  class AlgorithmService implements Algorithm {
    public completed: boolean;
    public error: boolean;
    public _subscription: Subscription;

    private deepCopy: DeepCopy;
    private machineStatus: BehaviorSubject<MachineStatus>;

    constructor() {
      this.completed = false;
      this.error = false;
      this.deepCopy = new DeepCopy();
    }

    public getDefaultInitialTape(): Tape {
      const squares: Array<Square> = [];
      squares.push(new Square(1, ''));
      squares.push(new Square(2, ''));
      return new Tape(squares);
    }

    public evolve(initialTape: Tape): Observable<MachineStatus> {
      const initialStatus: MachineStatus = new MachineStatus(<Tape>this.deepCopy.apply(initialTape), 0);
      this.machineStatus = new BehaviorSubject(initialStatus);
      this._subscription = Observable.interval(100).take(1).subscribe(res => {
        const squares: Array<Square> = [];
        squares.push(initialTape.squares[0].value === '' ? new Square(1, '') : new Square(1, 'A'));
        squares.push(initialTape.squares[0].value === '' ? new Square(2, 'A') : new Square(2, 'B'));
        const tape: Tape = new Tape(squares);
        const actualStatus: MachineStatus = new MachineStatus(tape, 1);
        this.machineStatus.next(actualStatus);
        this.machineStatus.complete();
        this.completed = true;
        this.error = false;
      });
      return this.machineStatus.asObservable();
    }

    public get subscription(): Subscription {
      return this._subscription;
    }

    public set subscription(newSubscription: Subscription) {
      this._subscription = newSubscription;
    }

    public stop(): void {
      this.completed = true;
      this.machineStatus.complete();
      this.subscription.unsubscribe();
    }
  }

  class IntervalServiceStub extends IntervalService {
    public setInterval(callback: () => void, time: number) {
      callback();
    }

    public clear(): void {
    }
  }

});
