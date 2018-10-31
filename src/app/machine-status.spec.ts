import { Square } from './square';
import { Tape } from './tape';
import { MachineStatus } from './machine-status';
import { TapeSymbol } from './tape-symbol';

describe('MachineStatus', () => {

  const configurationName = 'configuration name';
  const squares: Array<Square> = [new Square(1, new TapeSymbol(TapeSymbol.ONE)), new Square(2, new TapeSymbol(TapeSymbol.X))];
  const tape: Tape = new Tape(squares);
  const index = 1;

  let machineStatus: MachineStatus;

  beforeEach(() => {
    machineStatus = new MachineStatus(configurationName, tape, index);
  });

  it('should get the configuration name', () => {
    expect(machineStatus.configurationName).toEqual(configurationName);
  });

  it('should get the tape', () => {
    expect(machineStatus.tape).toEqual(tape);
  });

  it('should get the index', () => {
    expect(machineStatus.index).toEqual(index);
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
