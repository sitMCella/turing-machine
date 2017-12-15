import { Square } from '../square';
import { Tape } from '../tape';
import { MachineStatus } from '../machine-status';
import { MoveRightOperation } from './move-right-operation';
import { TapeSymbol } from '../tape-symbol';

describe('MoveRightOperation', () => {

  it('should move to the next index tape square', () => {
    const squares: Array<Square> = [new Square(1, new TapeSymbol(TapeSymbol.NONE)), new Square(2, new TapeSymbol(TapeSymbol.NONE))];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(tape, 0);
    const moveRightOperation: MoveRightOperation = new MoveRightOperation();

    const newMachineStatus: MachineStatus = moveRightOperation.apply(machineStatus);

    expect(newMachineStatus).toBe(machineStatus);
    expect(newMachineStatus.tape.squares[0].id).toBe(1);
    expect(newMachineStatus.tape.squares[0].symbol.value).toBe(TapeSymbol.NONE);
    expect(newMachineStatus.tape.squares[1].id).toBe(2);
    expect(newMachineStatus.tape.squares[1].symbol.value).toBe(TapeSymbol.NONE);
    expect(newMachineStatus.index).toBe(1);
  });

});
