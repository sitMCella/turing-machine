import { Square } from './square';
import { Tape } from './tape';
import { MachineStatus } from './machine-status';
import { TapeSymbol } from './tape-symbol';

describe('MachineStatus', () => {

  let machineStatus: MachineStatus;

  beforeEach(() => {
    const squares: Array<Square> = [new Square(1, new TapeSymbol(TapeSymbol.ONE)), new Square(2, new TapeSymbol(TapeSymbol.X))];
    const tape: Tape = new Tape(squares);
    machineStatus = new MachineStatus(tape, 1);
  });

  describe('symbol', () => {

    it('should get the actual tape symbol', () => {
      expect(machineStatus.symbol.value).toEqual(TapeSymbol.X);
    });

    it('should throw Error if cannot read symbol on actual tape square', () => {
      machineStatus.index = 5;

      const symbol = function () {
        return machineStatus.symbol;
      };

      expect(symbol).toThrow(new Error('Cannot read symbol on square with index 6'));
    });

    it('should set the actual tape symbol', () => {
      machineStatus.symbol = new TapeSymbol(TapeSymbol.SCHWA);

      expect(machineStatus.symbol.value).toEqual(TapeSymbol.SCHWA);
    });

  });

  describe('maxSquareCount', () => {

    it('should return false if index is less than the tape squares count', () => {
      machineStatus.index = 1;

      expect(machineStatus.maxSquareCount()).toBeFalsy();
    });

    it('should return true if index is equal to the tape squares count', () => {
      machineStatus.index = 2;

      expect(machineStatus.maxSquareCount()).toBeTruthy();
    });

    it('should return true if index is more than the tape squares count', () => {
      machineStatus.index = 3;

      expect(machineStatus.maxSquareCount()).toBeTruthy();
    });

  });

});
