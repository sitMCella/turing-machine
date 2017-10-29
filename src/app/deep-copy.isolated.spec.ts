import { MachineStatus } from './machine-status';
import { Tape } from './tape';
import { Square } from './square';
import { DeepCopy } from './deep-copy';

describe('DeepCopy', () => {
  let deepCopy: DeepCopy;

  beforeEach(() => {
    deepCopy = new DeepCopy();
  });

  it('should copy Square object', () => {
    const square: Square = new Square(1, 'R');

    const copiedSquare: Square = <Square>deepCopy.apply(square);

    expect(copiedSquare).not.toBe(square);
    expect(copiedSquare.id).toBe(1);
    expect(copiedSquare.value).toBe('R');
  });

  it('should copy Tape object', () => {
    const squares: Array<Square> = [new Square(1, ''), new Square(2, 'Y')];
    const tape: Tape = new Tape(squares);

    const copiedTape: Tape = <Tape>deepCopy.apply(tape);

    expect(copiedTape).not.toBe(tape);
    expect(copiedTape.squares).not.toBe(tape.squares);
    expect(copiedTape.squares.length).toBe(2);
    expect(copiedTape.squares[0].id).toBe(1);
    expect(copiedTape.squares[0].value).toBe('');
    expect(copiedTape.squares[1].id).toBe(2);
    expect(copiedTape.squares[1].value).toBe('Y');
  });

  it('should copy MachineStatus object', () => {
    const squares: Array<Square> = [new Square(1, 'P')];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(tape, 3);

    const copiedMachineStatus: MachineStatus = <MachineStatus>deepCopy.apply(machineStatus);

    expect(copiedMachineStatus).not.toBe(machineStatus);
    expect(copiedMachineStatus.tape).not.toBe(machineStatus.tape);
    expect(copiedMachineStatus.tape.squares.length).toBe(1);
    expect(copiedMachineStatus.tape.squares[0].id).toBe(1);
    expect(copiedMachineStatus.tape.squares[0].value).toBe('P');
    expect(copiedMachineStatus.index).toBe(3);
  });

});
