import { Square } from '../square';
import { Tape } from '../tape';
import { MachineStatus } from '../machine-status';
import { PrintZeroOperation } from './print-zero-operation';
import { TapeSymbol } from '../tape-symbol';

describe('PrintZeroOperation', () => {
  let printZeroOperation: PrintZeroOperation;

  beforeEach(() => {
    printZeroOperation = new PrintZeroOperation();
  });

  it('should print character 0 into the index tape square', () => {
    const squares: Array<Square> = [new Square(1, new TapeSymbol(TapeSymbol.NONE))];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(tape, 0);

    const newMachineStatus: MachineStatus = printZeroOperation.apply(machineStatus);

    expect(newMachineStatus).toBe(machineStatus);
    expect(newMachineStatus.tape.squares[0].id).toBe(1);
    expect(newMachineStatus.tape.squares[0].symbol.value).toBe(TapeSymbol.ZERO);
    expect(newMachineStatus.index).toBe(0);
  });

  it('should throw Error if tape already contains a symbol in current index', () => {
    const squares: Array<Square> = [new Square(1, new TapeSymbol(TapeSymbol.ONE))];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(tape, 0);

    const apply = function () {
      printZeroOperation.apply(machineStatus);
    };

    expect(apply).toThrow(new Error('Tape already contains a symbol in current index'));
  });

});
