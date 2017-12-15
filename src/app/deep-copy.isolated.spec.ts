import { MachineStatus } from './machine-status';
import { Tape } from './tape';
import { Square } from './square';
import { DeepCopy } from './deep-copy';
import { TapeSymbol } from './tape-symbol';

describe('DeepCopy', () => {
  let deepCopy: DeepCopy;

  beforeEach(() => {
    deepCopy = new DeepCopy();
  });

  it('should copy Square object', () => {
    const square: Square = new Square(1, new TapeSymbol(TapeSymbol.ANY));

    const copiedSquare: Square = <Square>deepCopy.apply(square);

    expect(copiedSquare).not.toBe(square);
    expect(copiedSquare.id).toBe(1);
    expect(copiedSquare.value.value).toBe(TapeSymbol.ANY);
  });

  it('should copy Tape object', () => {
    const squares: Array<Square> = [new Square(1, new TapeSymbol(TapeSymbol.NONE)), new Square(2, new TapeSymbol(TapeSymbol.SCHWA))];
    const tape: Tape = new Tape(squares);

    const copiedTape: Tape = <Tape>deepCopy.apply(tape);

    expect(copiedTape).not.toBe(tape);
    expect(copiedTape.squares).not.toBe(tape.squares);
    expect(copiedTape.squares.length).toBe(2);
    expect(copiedTape.squares[0].id).toBe(1);
    expect(copiedTape.squares[0].value.value).toBe(TapeSymbol.NONE);
    expect(copiedTape.squares[1].id).toBe(2);
    expect(copiedTape.squares[1].value.value).toBe(TapeSymbol.SCHWA);
  });

  it('should copy MachineStatus object', () => {
    const squares: Array<Square> = [new Square(1, new TapeSymbol(TapeSymbol.ONE))];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(tape, 3);

    const copiedMachineStatus: MachineStatus = <MachineStatus>deepCopy.apply(machineStatus);

    expect(copiedMachineStatus).not.toBe(machineStatus);
    expect(copiedMachineStatus.tape).not.toBe(machineStatus.tape);
    expect(copiedMachineStatus.tape.squares.length).toBe(1);
    expect(copiedMachineStatus.tape.squares[0].id).toBe(1);
    expect(copiedMachineStatus.tape.squares[0].value.value).toBe(TapeSymbol.ONE);
    expect(copiedMachineStatus.index).toBe(3);
  });

});
