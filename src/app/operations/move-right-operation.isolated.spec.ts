import { Square } from '../square';
import { Tape } from '../tape';
import { MachineStatus } from '../machine-status';
import { MoveRightOperation } from './move-right-operation';

describe('PrintOneOperation', () => {

    it('should move to the next index tape square', () => {
        const squares: Array<Square> = [new Square(1, ''), new Square(2, '')];
        const tape: Tape = new Tape(squares);
        const machineStatus: MachineStatus = new MachineStatus(tape, 0);
        const moveRightOperation: MoveRightOperation = new MoveRightOperation();

        const newMachineStatus: MachineStatus = moveRightOperation.apply(machineStatus);

        expect(newMachineStatus).toBe(machineStatus);
        expect(newMachineStatus.tape.squares[0].id).toBe(1);
        expect(newMachineStatus.tape.squares[0].value).toBe('');
        expect(newMachineStatus.tape.squares[1].id).toBe(2);
        expect(newMachineStatus.tape.squares[1].value).toBe('');
        expect(newMachineStatus.index).toBe(1);
    });

});
