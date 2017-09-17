import { Tape } from './tape';

export class MachineStatus {
    public tape: Tape;
    public index: number;

    constructor(tape: Tape, index: number) {
        this.tape = tape;
        this.index = index;
    }

}
