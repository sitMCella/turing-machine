import { Square } from '../square';
import { Tape } from '../tape';
import { MachineStatus } from '../machine-status';
import { PrintOneOperation } from './print-one-operation';

describe('PrintOneOperation', () => {

  let printOneOperation: PrintOneOperation;

  beforeEach(() => {
    printOneOperation = new PrintOneOperation();
  });

  it('should print character 1 into the index tape square', () => {
    const squares: Array<Square> = [new Square(1, '')];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(tape, 0);

    const newMachineStatus: MachineStatus = printOneOperation.apply(machineStatus);

    expect(newMachineStatus).toBe(machineStatus);
    expect(newMachineStatus.tape.squares[0].id).toBe(1);
    expect(newMachineStatus.tape.squares[0].value).toBe('1');
    expect(newMachineStatus.index).toBe(0);
  });

  it('should throw Error if tape already contains a symbol in current index', () => {
    const squares: Array<Square> = [new Square(1, 'A')];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(tape, 0);

    const apply = function () {
      printOneOperation.apply(machineStatus);
    };

    expect(apply).toThrow(new Error('Tape already contains a symbol in current index'));
  });

});
