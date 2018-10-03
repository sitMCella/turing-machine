import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Subscription, Observable, BehaviorSubject, interval } from 'rxjs';
import { TapeComponent } from './tape.component';
import { Tape } from '../tape';
import { Square } from '../square';
import { MachineStatus } from '../machine-status';
import { Algorithm } from '../algorithm';
import { DeepCopy } from '../deep-copy';
import { IntervalService } from '../interval.service';
import { TapeSymbol } from '../tape-symbol';

xdescribe('TapeComponent', () => {
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

  it('should be created', fakeAsync(() => {
    tick(200);
    discardPeriodicTasks();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should contain the default initial tape', fakeAsync(() => {
    tick(200);
    discardPeriodicTasks();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const initialTape: HTMLElement = compiled.querySelector('.initial-tape');
    expect(initialTape).not.toBeNull();
    expect(initialTape).toBeDefined();
  }));

  it('should contain the default initial tape with 2 squares', fakeAsync(() => {
    tick(200);
    discardPeriodicTasks();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const squares: Array<HTMLElement> = compiled.querySelectorAll('.initial-tape .square');
    expect(squares).not.toBeNull();
    expect(squares).toBeDefined();
    expect(squares.length).toBe(2);
  }));

  it('should contain the evolve button', fakeAsync(() => {
    tick(200);
    discardPeriodicTasks();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const stopButton: HTMLButtonElement = compiled.querySelector('.evolve');
    expect(stopButton).not.toBeNull();
    expect(stopButton).toBeDefined();
  }));

  it('should contain the stop button', fakeAsync(() => {
    tick(200);
    discardPeriodicTasks();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const stopButton: HTMLButtonElement = compiled.querySelector('.stop');
    expect(stopButton).not.toBeNull();
    expect(stopButton).toBeDefined();
  }));

  it('should evolve algorithm with default initial tape', fakeAsync(() => {
    tick(200);
    discardPeriodicTasks();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const tapes: Array<HTMLElement> = compiled.querySelectorAll('.tape');
    expect(tapes).not.toBeNull();
    expect(tapes).toBeDefined();
    expect(tapes.length).toEqual(2);
  }));

  describe('resize setting', () => {

    it('should resize default initial tape squares count', fakeAsync(() => {
      tick(200);
      discardPeriodicTasks();
      fixture.detectChanges();
      const compiled: any = fixture.debugElement.nativeElement;
      const squaresCount: HTMLInputElement = compiled.querySelector('.squaresCount input');
      squaresCount.value = '4';
      squaresCount.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const resizeButton: HTMLButtonElement = compiled.querySelector('.applySettings');
        resizeButton.click();
        fixture.detectChanges();
        tick(50);
        discardPeriodicTasks();
        fixture.detectChanges();

        const squares: Array<HTMLElement> = compiled.querySelectorAll('.initial-tape .square');
        expect(squares).not.toBeNull();
        expect(squares).toBeDefined();
        expect(squares.length).toBe(4);
      });
    }));

  });

  describe('evolve button', () => {

    it('should evolve algorithm with default initial tape', fakeAsync(() => {
      tick(200);
      discardPeriodicTasks();
      const compiled: any = fixture.debugElement.nativeElement;
      const evolveButton: HTMLButtonElement = compiled.querySelector('.evolve');

      evolveButton.click();
      fixture.detectChanges();
      tick(200);
      discardPeriodicTasks();
      fixture.detectChanges();

      const tapes: Array<any> = compiled.querySelectorAll('.tape');
      expect(tapes).not.toBeNull();
      expect(tapes).toBeDefined();
      expect(tapes.length).toBe(2);
      const secondTapeSquares: Array<HTMLElement> = tapes[1].querySelectorAll('.square');
      expect(secondTapeSquares[0].innerText).toBe('');
      expect(secondTapeSquares[1].innerText).toBe('1');
    }));

    it('should evolve algorithm with modified initial tape', fakeAsync(() => {
      tick(200);
      discardPeriodicTasks();
      const compiled: any = fixture.debugElement.nativeElement;
      const squares: Array<HTMLElement> = compiled.querySelectorAll('.initial-tape .square');
      const firstSquareInitialTape: HTMLInputElement = squares[0].querySelector('input');
      firstSquareInitialTape.value = '1';
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
        expect(secondTapeSquares[0].innerText).toBe('1');
        expect(secondTapeSquares[1].innerText).toBe('0');
      });
    }));

  });

  describe('stop button', () => {

    xit('should stop algorithm evolution', fakeAsync(() => {
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

  describe('pause button', () => {

    xit('should break algorithm evolution', fakeAsync(() => {
      const compiled: any = fixture.debugElement.nativeElement;
      const pauseButton: HTMLButtonElement = compiled.querySelector('.pause');

      pauseButton.click();
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
    public errorMessage: string;
    public break: boolean;
    public _subscription: Subscription;

    private deepCopy: DeepCopy;
    private machineStatus: BehaviorSubject<MachineStatus>;

    constructor() {
      this.completed = false;
      this.error = false;
      this.break = false;
      this.deepCopy = new DeepCopy();
    }

    public getDefaultInitialTape(): Tape {
      const squares: Array<Square> = [];
      squares.push(new Square(1, new TapeSymbol(TapeSymbol.NONE)));
      squares.push(new Square(2, new TapeSymbol(TapeSymbol.NONE)));
      return new Tape(squares);
    }

    public evolve(initialTape: Tape): Observable<MachineStatus> {
      const initialStatus: MachineStatus = new MachineStatus(<Tape>this.deepCopy.apply(initialTape), 0);
      this.machineStatus = new BehaviorSubject(initialStatus);
      this._subscription = interval(100).subscribe(res => {
        const squares: Array<Square> = [];
        if (initialTape.squares[0].symbol.value === TapeSymbol.NONE) {
          squares.push(new Square(1, new TapeSymbol(TapeSymbol.NONE)));
          squares.push(new Square(2, new TapeSymbol(TapeSymbol.ONE)));
        } else {
          squares.push(new Square(1, new TapeSymbol(TapeSymbol.ONE)));
          squares.push(new Square(2, new TapeSymbol(TapeSymbol.ZERO)));
        }
        const tape: Tape = new Tape(squares);
        const actualStatus: MachineStatus = new MachineStatus(tape, 1);
        this.machineStatus.next(actualStatus);
        this.machineStatus.complete();
        this.completed = true;
        this.error = false;
      });
      return this.machineStatus.asObservable();
    }

    public stop(): void {
      this.completed = true;
      this.machineStatus.complete();
      this.subscription.unsubscribe();
    }

    public pause(): void {
      this.break = true;
      this.subscription.unsubscribe();
    }

    public resume(): void {
      this.break = false;
    }

    public get subscription(): Subscription {
      return this._subscription;
    }

    public set subscription(newSubscription: Subscription) {
      this._subscription = newSubscription;
    }

  }

});
