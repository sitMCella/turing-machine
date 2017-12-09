import { async } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import { TapeComponent } from './tape.component';
import { AlgorithmEvolutionService } from '../algorithm-evolution.service';
import { OneThirdAlgorithmService } from '../one-third-machine/one-third-algorithm.service';
import { MachineStatus } from '../machine-status';
import { Tape } from '../tape';
import { Square } from '../square';
import { IntervalService } from '../interval.service';

describe('TapeComponent', () => {
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
    observable = Observable.of(new MachineStatus(null, 33));
    spyOn(algorithm, 'evolve').and.returnValue(observable);
    machineStatusViewSubscription = new Subscription();
    spyOn(observable, 'subscribe').and.returnValue(machineStatusViewSubscription);
    spyOnProperty(algorithm, 'subscription', 'get').and.returnValue(subscription);
    const squares: Array<Square> = [new Square(1, ''), new Square(2, 'A')];
    defaultInitialTape = new Tape(squares);
    spyOn(algorithm, 'getDefaultInitialTape').and.returnValue(defaultInitialTape);
    spyOn(subscription, 'unsubscribe');
  });

  it('should initially have the default initial tape', () => {
    component.ngOnInit();

    expect(component.initialTape).not.toBeNull();
    expect(component.initialTape).toBeDefined();
    expect(component.initialTape.squares).toBeDefined();
    expect(component.initialTape.squares.length).toEqual(2);
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
    });

    it('should stop algorithm evolution', () => {
      component.evolve();

      component.stop();

      expect(algorithm.stop).toHaveBeenCalled();
    });

    it('should unsubscribe from algorithm', () => {
      spyOn(machineStatusViewSubscription, 'unsubscribe');
      component.evolve();

      component.stop();

      expect(machineStatusViewSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('should stop timer', () => {
      spyOn(intervalService, 'clear');
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
      spyOn(intervalService, 'clear');
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
      spyOn(intervalService, 'setInterval');
      component.evolve();
      component.pause();

      component.resume();

      expect(intervalService.setInterval).toHaveBeenCalled();
    });

  });

  class IntervalServiceStub extends IntervalService {
    public setInterval(callback: () => void, time: number) {
    }

    public clear(): void {
    }
  }

});
