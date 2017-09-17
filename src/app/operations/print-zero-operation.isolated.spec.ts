import { Square } from '../square';
import { Tape } from '../tape';
import { MachineStatus } from '../machine-status';
import { PrintZeroOperation } from './print-zero-operation';

describe('PrintZeroOperation', () => {
    let printZeroOperation: PrintZeroOperation;

    beforeEach(() => {
        printZeroOperation = new PrintZeroOperation();
    });

    it('should print character 0 into the index tape square', () => {
        const squares: Array<Square> = [new Square(1, '')];
        const tape: Tape = new Tape(squares);
        const machineStatus: MachineStatus = new MachineStatus(tape, 0);

        const newMachineStatus: MachineStatus = printZeroOperation.apply(machineStatus);

        expect(newMachineStatus).toBe(machineStatus);
        expect(newMachineStatus.tape.squares[0].id).toBe(1);
        expect(newMachineStatus.tape.squares[0].value).toBe('0');
        expect(newMachineStatus.index).toBe(0);
    });

});
