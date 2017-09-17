import { Square } from './square';

export class Tape {
    squares: Array<Square>;

    constructor(squares: Array<Square>) {
        this.squares = squares;
    }
}
