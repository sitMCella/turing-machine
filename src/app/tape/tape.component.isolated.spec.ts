import { Subscription, Observable, of } from 'rxjs';
import { TapeComponent } from './tape.component';
import { AlgorithmEvolutionService } from '../algorithm-evolution.service';
import { OneThirdAlgorithmService } from '../one-third-machine/one-third-algorithm.service';
import { MachineStatus } from '../machine-status';
import { Tape } from '../tape';
import { Square } from '../square';
import { TapeSymbol } from '../tape-symbol';
import { IntervalService } from '../interval.service';
import { TimeServiceStub } from '../time-stub.service';

describe('TapeComponent', () => {

  let component: TapeComponent;
  let intervalService: IntervalService;
  let intervalServiceAlgorithmEvolution: IntervalService;
  let algorithm: OneThirdAlgorithmService;
  let observable: Observable<MachineStatus>;
  let subscription: Subscription;
  let defaultInitialTape: Tape;
  let machineStatusViewSubscription: Subscription;

  beforeEach(() => {
    intervalService = new IntervalService(new TimeServiceStub());
    component = new TapeComponent(intervalService);
    subscription = new Subscription();
    intervalServiceAlgorithmEvolution = new IntervalService(new TimeServiceStub());
    const algorithmEvolutionService: AlgorithmEvolutionService = new AlgorithmEvolutionService(intervalServiceAlgorithmEvolution);
    algorithm = new OneThirdAlgorithmService(algorithmEvolutionService);
    algorithm.subscription = subscription;
    component.algorithm = algorithm;
    observable = of(new MachineStatus('configuration name', null, 33));
    jest.spyOn(algorithm, 'evolve').mockReturnValue(observable);
    jest.spyOn(observable, 'pipe').mockReturnValue(observable);
    machineStatusViewSubscription = new Subscription();
    jest.spyOn(observable, 'subscribe').mockReturnValue(machineStatusViewSubscription);
    jest.spyOn(algorithm, 'subscription', 'get').mockReturnValue(subscription);
    const squares: Array<Square> = [new Square(1, new TapeSymbol(TapeSymbol.NONE)), new Square(2, new TapeSymbol(TapeSymbol.ONE))];
    defaultInitialTape = new Tape(squares);
    jest.spyOn(algorithm, 'getDefaultInitialTape').mockReturnValue(defaultInitialTape);
    jest.spyOn(subscription, 'unsubscribe');
    jest.spyOn(intervalService, 'clear');
    jest.spyOn(intervalService, 'subscribe');
    jest.spyOn(intervalService, 'setInterval');
    jest.spyOn(intervalServiceAlgorithmEvolution, 'clear');
    jest.spyOn(intervalServiceAlgorithmEvolution, 'subscribe');
    jest.spyOn(intervalServiceAlgorithmEvolution, 'setInterval');
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
      jest.spyOn(algorithm, 'stop');
      jest.spyOn(machineStatusViewSubscription, 'unsubscribe');
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
      jest.spyOn(algorithm, 'pause');
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
      jest.spyOn(algorithm, 'resume');
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
