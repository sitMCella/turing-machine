import { Tape } from './tape';

export class MachineStatus {
  public tape: Tape;
  public index: number;

  constructor(tape: Tape, index: number) {
    this.tape = tape;
    this.index = index;
  }

  public get symbol(): string {
    if (this.maxSquareCount()) {
      throw new Error('Cannot read symbol on square with index ' + (this.index + 1));
    }
    return this.tape.squares[this.index].value;
  }

  public set symbol(value: string) {
    this.tape.squares[this.index].value = value;
  }

  public maxSquareCount(): boolean {
    return this.index >= this.tape.squares.length;
  }

}
