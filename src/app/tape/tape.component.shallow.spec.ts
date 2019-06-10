import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Subscription, Observable, BehaviorSubject, interval } from 'rxjs';
import { TapeComponent } from './tape.component';
import { Configuration } from '../configuration';
import { Operation } from '../operation';
import { Tape } from '../tape';
import { Square } from '../square';
import { MachineStatus } from '../machine-status';
import { Algorithm } from '../algorithm';
import { DeepCopy } from '../deep-copy';
import { IntervalService } from '../interval.service';
import { TapeSymbol } from '../tape-symbol';
import { TimeServiceStub } from '../time-stub.service';

describe('TapeComponent', () => {

  class FakeFirstOperation implements Operation {
    apply(machineStatus: MachineStatus): MachineStatus {
      const finalSquares: Array<Square> = [new Square(1, new TapeSymbol(TapeSymbol.ONE)), new Square(2, new TapeSymbol(TapeSymbol.NONE))];
      const finalTape: Tape = new Tape(finalSquares);
      const finalMachineStatus: MachineStatus = new MachineStatus(machineStatus.configurationName, finalTape, 1);
      return finalMachineStatus;
    }
  }

  class AlgorithmService implements Algorithm {
    public completed: boolean;
    public error: boolean;
    public errorMessage: string;
    public break: boolean;

    private firstConfiguration: Configuration;
    private _subscription: Subscription;
    private deepCopy: DeepCopy;
    private machineStatus: BehaviorSubject<MachineStatus>;

    constructor(private _intervalService: IntervalService) {
      this.completed = false;
      this.error = false;
      this.break = false;
      const operations: Array<Operation> = [new FakeFirstOperation()];
      const symbol: TapeSymbol = new TapeSymbol(TapeSymbol.NONE);
      this.firstConfiguration = new Configuration('b', symbol, operations, 'c');
      this.deepCopy = new DeepCopy();
    }

    public getFirstConfiguration(): Configuration {
      return this.firstConfiguration;
    }

    public getDefaultInitialTape(): Tape {
      const squares: Array<Square> = [];
      squares.push(new Square(1, new TapeSymbol(TapeSymbol.NONE)));
      squares.push(new Square(2, new TapeSymbol(TapeSymbol.NONE)));
      return new Tape(squares);
    }

    public evolve(initialTape: Tape): Observable<MachineStatus> {
      const initialStatus: MachineStatus = new MachineStatus('b', <Tape>this.deepCopy.apply(initialTape), 0);
      this.machineStatus = new BehaviorSubject(initialStatus);
      this._intervalService.setInterval(100);
      this._subscription = this._intervalService.subscribe(() => {
        const squares: Array<Square> = [];
        if (initialTape.squares[0].symbol.value === TapeSymbol.NONE) {
          squares.push(new Square(1, new TapeSymbol(TapeSymbol.NONE)));
          squares.push(new Square(2, new TapeSymbol(TapeSymbol.ONE)));
        } else {
          squares.push(new Square(1, new TapeSymbol(TapeSymbol.ONE)));
          squares.push(new Square(2, new TapeSymbol(TapeSymbol.ZERO)));
        }
        const tape: Tape = new Tape(squares);
        const actualStatus: MachineStatus = new MachineStatus('f', tape, 1);
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
      this._subscription.unsubscribe();
      this._intervalService.clear();
    }

    public pause(): void {
      this.break = true;
      this._subscription.unsubscribe();
      this._intervalService.clear();
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

  let algorithmTimeService: TimeServiceStub;
  let algorithmIntervalService: IntervalService;
  let timeService: TimeServiceStub;
  let intervalService: IntervalService;
  let component: TapeComponent;
  let fixture: ComponentFixture<TapeComponent>;
  let algorithm: Algorithm;

  beforeEach(async(() => {
    algorithmTimeService = new TimeServiceStub();
    algorithmIntervalService = new IntervalService(algorithmTimeService);
    algorithm = new AlgorithmService(algorithmIntervalService);
    timeService = new TimeServiceStub();
    intervalService = new IntervalService(timeService);
    TestBed.configureTestingModule({
      declarations: [TapeComponent],
      imports: [FormsModule],
      providers: [
        { provide: IntervalService, useValue: intervalService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TapeComponent);
    component = fixture.componentInstance;

    component.algorithm = algorithm;
  }));

  it('should be created', async(() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should contain the first configuration name', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    const firstConfigurationName: HTMLElement = compiled.querySelector('.initial-tape-configuration .configuration-name');
    expect(firstConfigurationName).not.toBeNull();
    expect(firstConfigurationName).toBeDefined();
    expect(firstConfigurationName.textContent).toBe('b');
  }));

  it('should contain the default initial tape', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    const initialTape: HTMLElement = compiled.querySelector('.initial-tape-configuration');
    expect(initialTape).not.toBeNull();
    expect(initialTape).toBeDefined();
  }));

  it('should contain the default initial tape with 2 squares', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    const squares: Array<HTMLElement> = compiled.querySelectorAll('.initial-tape-configuration .square');
    expect(squares).not.toBeNull();
    expect(squares).toBeDefined();
    expect(squares.length).toBe(2);
  }));

  it('should contain the evolve button', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    const stopButton: HTMLButtonElement = compiled.querySelector('.evolve');
    expect(stopButton).not.toBeNull();
    expect(stopButton).toBeDefined();
  }));

  it('should contain the stop button', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    const stopButton: HTMLButtonElement = compiled.querySelector('.stop');
    expect(stopButton).not.toBeNull();
    expect(stopButton).toBeDefined();
  }));

  it('should evolve algorithm with default initial tape', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    component.ngOnInit();
    fixture.detectChanges();

    algorithmTimeService.tick(1);
    fixture.detectChanges();

    const tapes: Array<HTMLElement> = compiled.querySelectorAll('.complete-configuration');
    expect(tapes).not.toBeNull();
    expect(tapes).toBeDefined();
    expect(tapes.length).toEqual(2);
  }));

  describe('resize setting', () => {

    it('should resize default initial tape squares count', async(() => {
      const compiled: any = fixture.debugElement.nativeElement;
      fixture.detectChanges();

      algorithmTimeService.tick(2);
      fixture.detectChanges();

      const squaresCount: HTMLInputElement = compiled.querySelector('.squaresCount input');
      squaresCount.value = '4';
      squaresCount.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const resizeButton: HTMLButtonElement = compiled.querySelector('.applySettings');
        resizeButton.click();
        fixture.detectChanges();
        algorithmTimeService.tick(1);
        fixture.detectChanges();

        const squares: Array<HTMLElement> = compiled.querySelectorAll('.initial-tape-configuration .square');
        expect(squares).not.toBeNull();
        expect(squares).toBeDefined();
        expect(squares.length).toBe(4);
      });
    }));

  });

  describe('evolve button', () => {

    it('should evolve algorithm with default initial tape', async(() => {
      const compiled: any = fixture.debugElement.nativeElement;
      fixture.detectChanges();
      algorithmTimeService.tick(1);
      fixture.detectChanges();
      const evolveButton: HTMLButtonElement = compiled.querySelector('.evolve');

      evolveButton.click();
      fixture.detectChanges();
      algorithmTimeService.tick(1);
      fixture.detectChanges();

      const tapes: Array<any> = compiled.querySelectorAll('.complete-configuration');
      expect(tapes).not.toBeNull();
      expect(tapes).toBeDefined();
      expect(tapes.length).toBe(2);
      const secondTapeSquares: Array<HTMLElement> = tapes[1].querySelectorAll('.square');
      expect(secondTapeSquares[0].innerText).toBe('');
      expect(secondTapeSquares[1].innerText).toBe('1');
    }));

    it('should evolve algorithm with modified initial tape', async(() => {
      const compiled: any = fixture.debugElement.nativeElement;
      fixture.detectChanges();
      algorithmTimeService.tick(1);
      fixture.detectChanges();
      const squares: Array<HTMLElement> = compiled.querySelectorAll('.initial-tape-configuration .square');
      const firstSquareInitialTape: HTMLInputElement = squares[0].querySelector('input');
      firstSquareInitialTape.value = '1';
      firstSquareInitialTape.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const evolveButton: HTMLButtonElement = compiled.querySelector('.evolve');
        evolveButton.click();
        fixture.detectChanges();
        algorithmTimeService.tick(1);
        fixture.detectChanges();

        const tapes: Array<any> = compiled.querySelectorAll('.complete-configuration');
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

    it('should stop algorithm evolution', async(() => {
      const compiled: any = fixture.debugElement.nativeElement;
      const stopButton: HTMLButtonElement = compiled.querySelector('.stop');

      fixture.detectChanges();
      algorithmTimeService.tick(1);
      fixture.detectChanges();
      stopButton.click();
      fixture.detectChanges();

      const tapes: Array<HTMLElement> = compiled.querySelectorAll('.complete-configuration');
      expect(tapes).not.toBeNull();
      expect(tapes).toBeDefined();
      expect(tapes.length).toBeLessThanOrEqual(2);
    }));

  });

  describe('pause button', () => {

    it('should break algorithm evolution', async(() => {
      const compiled: any = fixture.debugElement.nativeElement;
      fixture.detectChanges();
      const pauseButton: HTMLButtonElement = compiled.querySelector('.pause');

      pauseButton.click();
      fixture.detectChanges();

      const tapes: Array<HTMLElement> = compiled.querySelectorAll('.complete-configuration');
      expect(tapes).not.toBeNull();
      expect(tapes).toBeDefined();
      expect(tapes.length).toBeLessThanOrEqual(2);
    }));

  });

});
