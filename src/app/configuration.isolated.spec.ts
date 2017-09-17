import { Tape } from './tape';
import { Square } from './square';
import { Configuration } from './configuration';
import { Operation } from './operation';
import { MachineStatus } from './machine-status';

describe('Configuration', () => {
    const squares: Array<Square> = [new Square(1, '')];
    const tape: Tape = new Tape(squares);
    const initialMachineStatus: MachineStatus = new MachineStatus(tape, 0);

    it('should evolve machine status with one operation', () => {
        const operations: Array<Operation> = [new FakeFirstOperation()];
        const configuration: Configuration = new Configuration('initial configuration', '', operations, 'final configuration');

        const finalMachineStatus: MachineStatus = configuration.evolve(initialMachineStatus);

        const finalSquares: Array<Square> = [new Square(1, 'T'), new Square(2, '')];
        const finalTape: Tape = new Tape(finalSquares);
        const expectedMachineStatus: MachineStatus = new MachineStatus(finalTape, 1);
        expect(finalMachineStatus).not.toBe(initialMachineStatus);
        expect(finalMachineStatus.tape.squares.length).toBe(2);
        expect(finalMachineStatus.tape.squares[0].id).toBe(1);
        expect(finalMachineStatus.tape.squares[0].value).toBe('T');
        expect(finalMachineStatus.tape.squares[1].id).toBe(2);
        expect(finalMachineStatus.tape.squares[1].value).toBe('');
        expect(finalMachineStatus.index).toBe(1);
    });

    it('should evolve machine status with two operations', () => {
        const operations: Array<Operation> = [new FakeFirstOperation(), new FakeSecondOperation()];
        const configuration: Configuration = new Configuration('initial configuration', '', operations, 'final configuration');

        const finalMachineStatus: MachineStatus = configuration.evolve(initialMachineStatus);

        const finalSquares: Array<Square> = [new Square(1, 'T'), new Square(2, 'F')];
        const finalTape: Tape = new Tape(finalSquares);
        const expectedMachineStatus: MachineStatus = new MachineStatus(finalTape, 1);
        expect(finalMachineStatus).not.toBe(initialMachineStatus);
        expect(finalMachineStatus.tape.squares.length).toBe(2);
        expect(finalMachineStatus.tape.squares[0].id).toBe(1);
        expect(finalMachineStatus.tape.squares[0].value).toBe('T');
        expect(finalMachineStatus.tape.squares[1].id).toBe(2);
        expect(finalMachineStatus.tape.squares[1].value).toBe('F');
        expect(finalMachineStatus.index).toBe(1);
    });

});

class FakeFirstOperation implements Operation {
    apply(machineStatus: MachineStatus): MachineStatus {
        const finalSquares: Array<Square> = [new Square(1, 'T'), new Square(2, '')];
        const finalTape: Tape = new Tape(finalSquares);
        const finalMachineStatus: MachineStatus = new MachineStatus(finalTape, 1);
        return finalMachineStatus;
    }
}

class FakeSecondOperation implements Operation {
    apply(machineStatus: MachineStatus): MachineStatus {
        const finalSquares: Array<Square> = [new Square(1, 'T'), new Square(2, 'F')];
        const finalTape: Tape = new Tape(finalSquares);
        const finalMachineStatus: MachineStatus = new MachineStatus(finalTape, 1);
        return finalMachineStatus;
    }
}
