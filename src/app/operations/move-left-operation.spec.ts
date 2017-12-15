import { Square } from '../square';
import { Tape } from '../tape';
import { MachineStatus } from '../machine-status';
import { MoveLeftOperation } from './move-left-operation';
import { TapeSymbol } from '../tape-symbol';

describe('MoveLeftOperation', () => {

  it('should move to the previous index tape square', () => {
    const squares: Array<Square> = [new Square(1, new TapeSymbol(TapeSymbol.NONE)), new Square(2, new TapeSymbol(TapeSymbol.NONE))];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(tape, 1);
    const moveLeftOperation: MoveLeftOperation = new MoveLeftOperation();

    const newMachineStatus: MachineStatus = moveLeftOperation.apply(machineStatus);

    expect(newMachineStatus).toBe(machineStatus);
    expect(newMachineStatus.tape.squares[0].id).toBe(1);
    expect(newMachineStatus.tape.squares[0].value.value).toBe(TapeSymbol.NONE);
    expect(newMachineStatus.tape.squares[1].id).toBe(2);
    expect(newMachineStatus.tape.squares[1].value.value).toBe(TapeSymbol.NONE);
    expect(newMachineStatus.index).toBe(0);
  });

});
