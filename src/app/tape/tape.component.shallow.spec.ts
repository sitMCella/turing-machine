import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TapeComponent } from './tape.component';
import { Tape } from '../tape';
import { Square } from '../square';
import { MachineStatus } from '../machine-status';
import { OneThirdAlgorithmService } from '../one-third-machine/one-third-algorithm.service';
import { Algorithm } from '../algorithm';
import { DeepCopy } from '../deep-copy';

describe('TapeComponent', () => {
  let component: TapeComponent;
  let fixture: ComponentFixture<TapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TapeComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapeComponent);
    component = fixture.componentInstance;
    component.algorithm = new AlgorithmService();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contains the default initial tape', () => {
    const compiled = fixture.debugElement.nativeElement;
    const initialTape: HTMLElement = compiled.querySelector('.initial-tape');
    expect(initialTape).not.toBeNull();
    expect(initialTape).not.toBeUndefined();
  });

  it('should contains the default initial tape with 2 squares', () => {
    const compiled = fixture.debugElement.nativeElement;
    const squares: Array<HTMLElement> = compiled.querySelectorAll('.initial-tape .square');
    expect(squares).not.toBeNull();
    expect(squares).not.toBeUndefined();
    expect(squares.length).toBe(2);
  });

  it('should contains the evolve button', () => {
    const compiled = fixture.debugElement.nativeElement;
    const stopButton: HTMLButtonElement = compiled.querySelector('.evolve');
    expect(stopButton).not.toBeNull();
    expect(stopButton).not.toBeUndefined();
  });

  it('should contains the stop button', () => {
    const compiled = fixture.debugElement.nativeElement;
    const stopButton: HTMLButtonElement = compiled.querySelector('.stop');
    expect(stopButton).not.toBeNull();
    expect(stopButton).not.toBeUndefined();
  });

  it('should contains at least one tape', () => {
    const compiled = fixture.debugElement.nativeElement;
    const tapes: Array<HTMLElement> = compiled.querySelectorAll('.tape');
    expect(tapes == null).toBeFalsy();
    expect(tapes.length).toBeGreaterThanOrEqual(1);
  });

  describe('evolve button', () => {

    it('should start algorithm evolution with default initial tape', async(() => {
      const compiled: any = fixture.debugElement.nativeElement;
      const evolveButton: HTMLButtonElement = compiled.querySelector('.evolve');

      evolveButton.click();
      fixture.detectChanges();

      const tapes: Array<any> = compiled.querySelectorAll('.tape');
      expect(tapes == null).toBeFalsy();
      expect(tapes.length).toBe(2);
      const secondTapeSquares: Array<HTMLElement> = tapes[1].querySelectorAll('.square');
      expect(secondTapeSquares[0].innerText).toBe('');
      expect(secondTapeSquares[1].innerText).toBe('A');
    }));

    it('should start algorithm evolution with modified initial tape', async(() => {
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

        const tapes: Array<any> = compiled.querySelectorAll('.tape');
        expect(tapes == null).toBeFalsy();
        expect(tapes.length).toBe(2);
        const secondTapeSquares: Array<HTMLElement> = tapes[1].querySelectorAll('.square');
        expect(secondTapeSquares[0].innerText).toBe('A');
        expect(secondTapeSquares[1].innerText).toBe('B');
      });
    }));

  });

  describe('stop button', () => {

    it('should stop algorithm evolution', () => {
      const compiled: any = fixture.debugElement.nativeElement;
      const stopButton: HTMLButtonElement = compiled.querySelector('.stop');

      stopButton.click();
      fixture.detectChanges();

      const tapes: Array<HTMLElement> = compiled.querySelectorAll('.tape');
      expect(tapes).not.toBeNull();
      expect(tapes).not.toBeUndefined();
      expect(tapes.length).toBeLessThanOrEqual(20);
    });

  });

  class AlgorithmService implements Algorithm {
    public readonly machineStatusObservable: Observable<MachineStatus>;
    public completed: boolean;
    public error: boolean;

    private deepCopy: DeepCopy;
    private machineStatus: Subject<MachineStatus>;

    constructor() {
      this.completed = false;
      this.error = false;
      this.deepCopy = new DeepCopy();
      this.machineStatus = new Subject();
      this.machineStatusObservable = this.machineStatus.asObservable();
    }

    public getDefaultInitialTape(): Tape {
      const squares: Array<Square> = [];
      squares.push(new Square(1, ''));
      squares.push(new Square(2, ''));
      return new Tape(squares);
    }

    public evolve(initialTape: Tape): void {
      const initialStatus: MachineStatus = new MachineStatus(<Tape>this.deepCopy.apply(initialTape), 0);
      this.machineStatus.next(initialStatus);
      const squares: Array<Square> = [];
      squares.push(initialTape.squares[0].value === '' ? new Square(1, '') : new Square(1, 'A'));
      squares.push(initialTape.squares[0].value === '' ? new Square(2, 'A') : new Square(2, 'B'));
      const tape: Tape = new Tape(squares);
      const actualStatus: MachineStatus = new MachineStatus(tape, 1);
      this.machineStatus.next(actualStatus);
      this.completed = true;
      this.error = false;
    }

    public stop(): void {
      this.completed = true;
    }
  }

});
