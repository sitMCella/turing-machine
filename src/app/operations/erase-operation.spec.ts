import { Square } from '../square';
import { Tape } from '../tape';
import { MachineStatus } from '../machine-status';
import { EraseOperation } from './erase-operation';
import { TapeSymbol } from '../tape-symbol';

describe('EraseOperation', () => {

  let eraseOperation: EraseOperation;

  beforeEach(() => {
    eraseOperation = new EraseOperation();
  });

  it('should print empty character into the index tape square', () => {
    const squares: Array<Square> = [new Square(1, new TapeSymbol(TapeSymbol.ONE))];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(tape, 0);

    const newMachineStatus: MachineStatus = eraseOperation.apply(machineStatus);

    expect(newMachineStatus).toBe(machineStatus);
    expect(newMachineStatus.tape.squares[0].id).toBe(1);
    expect(newMachineStatus.tape.squares[0].symbol.value).toBe(TapeSymbol.NONE);
    expect(newMachineStatus.index).toBe(0);
  });

});
