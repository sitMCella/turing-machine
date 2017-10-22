import { async } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import { TapeComponent } from './tape.component';
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

    beforeEach(() => {
        intervalService = new IntervalServiceStub();
        component = new TapeComponent(intervalService);
        subscription = new Subscription();
        algorithm = new OneThirdAlgorithmService();
        algorithm.subscription = subscription;
        component.algorithm = algorithm;
        observable = Observable.of(new MachineStatus(null, 33));
        spyOn(algorithm, 'evolve').and.returnValue(observable);
        spyOnProperty(algorithm, 'subscription', 'get').and.returnValue(subscription);
        const squares: Array<Square> = [new Square(1, ''), new Square(2, 'A')];
        defaultInitialTape = new Tape(squares);
        spyOn(algorithm, 'getDefaultInitialTape').and.returnValue(defaultInitialTape);
        spyOn(algorithm, 'stop');
        spyOn(observable, 'subscribe');
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

    class IntervalServiceStub extends IntervalService {
        public setInterval(callback: () => void, time: number) {
        }

        public clear(): void {
        }
    }

});
