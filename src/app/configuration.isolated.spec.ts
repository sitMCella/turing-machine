import { TapeSymbol } from './tape-symbol';
import { Tape } from './tape';
import { Square } from './square';
import { Configuration } from './configuration';
import { Operation } from './operation';
import { MachineStatus } from './machine-status';

describe('Configuration', () => {

  class FakeFirstOperation implements Operation {
    apply(machineStatus: MachineStatus): MachineStatus {
      const finalSquares: Array<Square> = [new Square(1, new TapeSymbol(TapeSymbol.ONE)), new Square(2, new TapeSymbol(TapeSymbol.NONE))];
      const finalTape: Tape = new Tape(finalSquares);
      const finalMachineStatus: MachineStatus = new MachineStatus(machineStatus.configurationName, finalTape, 1);
      return finalMachineStatus;
    }
  }

  class FakeSecondOperation implements Operation {
    apply(machineStatus: MachineStatus): MachineStatus {
      const finalSquares: Array<Square> = [new Square(1, new TapeSymbol(TapeSymbol.ONE)), new Square(2, new TapeSymbol(TapeSymbol.ZERO))];
      const finalTape: Tape = new Tape(finalSquares);
      const finalMachineStatus: MachineStatus = new MachineStatus(machineStatus.configurationName, finalTape, 1);
      return finalMachineStatus;
    }
  }

  const squares: Array<Square> = [new Square(1, new TapeSymbol(TapeSymbol.NONE))];
  const tape: Tape = new Tape(squares);
  const initialConfigurationName = 'initial configuration';
  const finalConfigurationName = 'final configuration';
  const initialMachineStatus: MachineStatus = new MachineStatus(initialConfigurationName, tape, 0);

  it('should evolve machine status with one operation', () => {
    const operations: Array<Operation> = [new FakeFirstOperation()];
    const symbol: TapeSymbol = new TapeSymbol(TapeSymbol.NONE);
    const configuration: Configuration = new Configuration(initialConfigurationName, symbol, operations, finalConfigurationName);

    const finalMachineStatus: MachineStatus = configuration.evolve(initialMachineStatus);

    expect(finalMachineStatus).not.toBe(initialMachineStatus);
    expect(finalMachineStatus.tape.squares.length).toBe(2);
    expect(finalMachineStatus.tape.squares[0].id).toBe(1);
    expect(finalMachineStatus.tape.squares[0].symbol.value).toBe(TapeSymbol.ONE);
    expect(finalMachineStatus.tape.squares[1].id).toBe(2);
    expect(finalMachineStatus.tape.squares[1].symbol.value).toBe(TapeSymbol.NONE);
    expect(finalMachineStatus.index).toBe(1);
  });

  it('should evolve machine status with two operations', () => {
    const operations: Array<Operation> = [new FakeFirstOperation(), new FakeSecondOperation()];
    const symbol: TapeSymbol = new TapeSymbol(TapeSymbol.NONE);
    const configuration: Configuration = new Configuration(initialConfigurationName, symbol, operations, finalConfigurationName);

    const finalMachineStatus: MachineStatus = configuration.evolve(initialMachineStatus);

    expect(finalMachineStatus).not.toBe(initialMachineStatus);
    expect(finalMachineStatus.tape.squares.length).toBe(2);
    expect(finalMachineStatus.tape.squares[0].id).toBe(1);
    expect(finalMachineStatus.tape.squares[0].symbol.value).toBe(TapeSymbol.ONE);
    expect(finalMachineStatus.tape.squares[1].id).toBe(2);
    expect(finalMachineStatus.tape.squares[1].symbol.value).toBe(TapeSymbol.ZERO);
    expect(finalMachineStatus.index).toBe(1);
  });

});
