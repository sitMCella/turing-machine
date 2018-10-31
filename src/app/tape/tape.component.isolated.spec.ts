import { Subscription, Observable, of } from 'rxjs';
import { TapeComponent } from './tape.component';
import { AlgorithmEvolutionService } from '../algorithm-evolution.service';
import { OneThirdAlgorithmService } from '../one-third-machine/one-third-algorithm.service';
import { MachineStatus } from '../machine-status';
import { Tape } from '../tape';
import { Square } from '../square';
import { TapeSymbol } from '../tape-symbol';
import { IntervalService } from '../interval.service';

describe('TapeComponent', () => {

  class IntervalServiceStub extends IntervalService {
    public setInterval(callback: () => void, time: number) {
    }

    public clear(): void {
    }
  }

  let component: TapeComponent;
  let intervalService: IntervalService;
  let algorithm: OneThirdAlgorithmService;
  let observable: Observable<MachineStatus>;
  let subscription: Subscription;
  let defaultInitialTape: Tape;
  let machineStatusViewSubscription: Subscription;

  beforeEach(() => {
    intervalService = new IntervalServiceStub();
    component = new TapeComponent(intervalService);
    subscription = new Subscription();
    const algorithmEvolutionService: AlgorithmEvolutionService = new AlgorithmEvolutionService();
    algorithm = new OneThirdAlgorithmService(algorithmEvolutionService);
    algorithm.subscription = subscription;
    component.algorithm = algorithm;
    observable = of(new MachineStatus('configuration name', null, 33));
    spyOn(algorithm, 'evolve').and.returnValue(observable);
    spyOn(observable, 'pipe').and.returnValue(observable);
    machineStatusViewSubscription = new Subscription();
    spyOn(observable, 'subscribe').and.returnValue(machineStatusViewSubscription);
    spyOnProperty(algorithm, 'subscription', 'get').and.returnValue(subscription);
    const squares: Array<Square> = [new Square(1, new TapeSymbol(TapeSymbol.NONE)), new Square(2, new TapeSymbol(TapeSymbol.ONE))];
    defaultInitialTape = new Tape(squares);
    spyOn(algorithm, 'getDefaultInitialTape').and.returnValue(defaultInitialTape);
    spyOn(subscription, 'unsubscribe');
    spyOn(intervalService, 'clear');
    spyOn(intervalService, 'setInterval');
  });

  it('should initially have the default initial tape', () => {
    component.ngOnInit();

    expect(component.initialTape).not.toBeNull();
    expect(component.initialTape).toBeDefined();
    expect(component.initialTape.squares).toBeDefined();
    expect(component.initialTape.squares.length).toEqual(2);
  });

  it('should stop timer', () => {
    component.ngOnInit();

    expect(intervalService.clear).toHaveBeenCalled();
  });

  it('should start timer', () => {
    component.ngOnInit();

    expect(intervalService.setInterval).toHaveBeenCalled();
  });

  it('should initially have undefined squaresCount', () => {
    component.ngOnInit();

    expect(component.squaresCount).not.toBeNull();
    expect(component.squaresCount).toBeUndefined();
  });

  it('should initially create machine status view observable', () => {
    component.ngOnInit();

    expect(component.machineStatusObservable).not.toBeNull();
    expect(component.machineStatusObservable).toBeDefined();
  });

  it('should initially evolve algorithm', () => {
    component.ngOnInit();

    expect(algorithm.evolve).toHaveBeenCalled();
  });

  describe('evolve', () => {

    it('should create machine status view observable', () => {
      component.evolve();

      expect(component.machineStatusObservable).not.toBeNull();
      expect(component.machineStatusObservable).toBeDefined();
    });

    it('should evolve algorithm', () => {
      component.evolve();

      expect(algorithm.evolve).toHaveBeenCalled();
    });

  });

  describe('stop', () => {

    beforeEach(() => {
      spyOn(algorithm, 'stop');
      spyOn(machineStatusViewSubscription, 'unsubscribe');
    });

    it('should stop algorithm evolution', () => {
      component.evolve();

      component.stop();

      expect(algorithm.stop).toHaveBeenCalled();
    });

    it('should unsubscribe from algorithm', () => {
      component.evolve();

      component.stop();

      expect(machineStatusViewSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('should stop timer', () => {
      component.evolve();

      component.stop();

      expect(intervalService.clear).toHaveBeenCalled();
    });

  });

  describe('pause', () => {

    beforeEach(() => {
      spyOn(algorithm, 'pause');
    });

    it('should pause algorithm evolution', () => {
      component.evolve();

      component.pause();

      expect(algorithm.pause).toHaveBeenCalled();
    });

    it('should stop timer', () => {
      component.evolve();

      component.pause();

      expect(intervalService.clear).toHaveBeenCalled();
    });

  });

  describe('resume', () => {

    beforeEach(() => {
      spyOn(algorithm, 'resume');
    });

    it('should resume algorithm evolution', () => {
      component.evolve();
      component.pause();

      component.resume();

      expect(algorithm.resume).toHaveBeenCalled();
    });

    it('should start timer', () => {
      component.evolve();
      component.pause();

      component.resume();

      expect(intervalService.setInterval).toHaveBeenCalled();
    });

  });

});
