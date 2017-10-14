import { TapeComponent } from './tape.component';
import { OneThirdAlgorithmService } from '../one-third-machine/one-third-algorithm.service';
import { MachineStatus } from '../machine-status';
import { Tape } from '../tape';

describe('TapeComponent', () => {
    let component: TapeComponent;
    let algorithm: OneThirdAlgorithmService;

    beforeEach(() => {
        component = new TapeComponent();
        algorithm = new OneThirdAlgorithmService();
        component.algorithm = algorithm;
        spyOn(algorithm, 'evolve');
        spyOn(algorithm, 'stop');
    });

    describe('evolve button', () => {

        it('should reset machine status', () => {
            const tape: Tape = new Tape([]);
            const machineStatus: MachineStatus = new MachineStatus(tape, 1);
            component.machineStatus.push(machineStatus);

            component.evolve();

            expect(component.machineStatus.length).toBe(0);
        });

        it('should evolve algorithm', () => {
            component.evolve();

            expect(algorithm.evolve).toHaveBeenCalled();
        });

    });

});
