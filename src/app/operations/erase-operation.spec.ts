import { Square } from '../square';
import { Tape } from '../tape';
import { MachineStatus } from '../machine-status';
import { EraseOperation } from './erase-operation';
import { TapeSymbol } from '../tape-symbol';

describe('EraseOperation', () => {

  const configurationName = 'configuration name';
  const squareId = 1;
  const tapeSymbol: TapeSymbol = new TapeSymbol(TapeSymbol.ONE);
  const squares: Array<Square> = [new Square(squareId, tapeSymbol)];
  const tape: Tape = new Tape(squares);
  const index = 0;

  let eraseOperation: EraseOperation;

  beforeEach(() => {
    eraseOperation = new EraseOperation();
  });

  it('should the new machine status be the same object as the initial machine status', () => {
    const machineStatus: MachineStatus = new MachineStatus(configurationName, tape, index);

    const newMachineStatus: MachineStatus = eraseOperation.apply(machineStatus);

    expect(newMachineStatus).toBe(machineStatus);
  });

  it('should keep the same configuration name into the new machine status', () => {
    const machineStatus: MachineStatus = new MachineStatus(configurationName, tape, index);

    const newMachineStatus: MachineStatus = eraseOperation.apply(machineStatus);

    expect(newMachineStatus.configurationName).toBe(configurationName);
  });

  it('should keep the same tape squares count into the new machine status', () => {
    const machineStatus: MachineStatus = new MachineStatus(configurationName, tape, index);

    const newMachineStatus: MachineStatus = eraseOperation.apply(machineStatus);

    expect(newMachineStatus.tape.squares.length).toBe(1);
  });

  it('should keep the same tape square id into the new machine status', () => {
    const machineStatus: MachineStatus = new MachineStatus(configurationName, tape, index);

    const newMachineStatus: MachineStatus = eraseOperation.apply(machineStatus);

    expect(newMachineStatus.tape.squares[0].id).toBe(squareId);
  });

  it('should have a different tape square symbol into the new machine status', () => {
    const machineStatus: MachineStatus = new MachineStatus(configurationName, tape, index);

    const newMachineStatus: MachineStatus = eraseOperation.apply(machineStatus);

    expect(newMachineStatus.tape.squares[0].symbol).not.toBe(tapeSymbol);
  });

  it('should insert an empty character into the index tape square', () => {
    const machineStatus: MachineStatus = new MachineStatus(configurationName, tape, index);

    const newMachineStatus: MachineStatus = eraseOperation.apply(machineStatus);

    expect(newMachineStatus.tape.squares[0].symbol.value).toBe(TapeSymbol.NONE);
  });

  it('should keep the same index into the new machine status', () => {
    const machineStatus: MachineStatus = new MachineStatus(configurationName, tape, index);

    const newMachineStatus: MachineStatus = eraseOperation.apply(machineStatus);

    expect(newMachineStatus.index).toBe(index);
  });

});
