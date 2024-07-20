import { Square } from "../square";
import { Tape } from "../tape";
import { MachineStatus } from "../machine-status";
import { MoveRightOperation } from "./move-right-operation";
import { TapeSymbol } from "../tape-symbol";

describe("MoveRightOperation", () => {
  const configurationName = "configuration name";
  const firstSquareId = 1;
  const firstTapeSymbol = new TapeSymbol(TapeSymbol.NONE);
  const secondSquareId = 2;
  const secondTapeSymbol = new TapeSymbol(TapeSymbol.NONE);
  const squares: Array<Square> = [
    new Square(firstSquareId, firstTapeSymbol),
    new Square(secondSquareId, secondTapeSymbol),
  ];
  const tape: Tape = new Tape(squares);
  const index = 0;

  let moveRightOperation: MoveRightOperation;

  beforeEach(() => {
    moveRightOperation = new MoveRightOperation();
  });

  it("should the new machine status be the same object as the initial machine status", () => {
    const machineStatus: MachineStatus = new MachineStatus(
      configurationName,
      tape,
      index,
    );

    const newMachineStatus: MachineStatus =
      moveRightOperation.apply(machineStatus);

    expect(newMachineStatus).toBe(machineStatus);
  });

  it("should keep the same configuration name into the new machine status", () => {
    const machineStatus: MachineStatus = new MachineStatus(
      configurationName,
      tape,
      index,
    );

    const newMachineStatus: MachineStatus =
      moveRightOperation.apply(machineStatus);

    expect(newMachineStatus.configurationName).toBe(configurationName);
  });

  it("should keep the same tape squares count into the new machine status", () => {
    const machineStatus: MachineStatus = new MachineStatus(
      configurationName,
      tape,
      index,
    );

    const newMachineStatus: MachineStatus =
      moveRightOperation.apply(machineStatus);

    expect(newMachineStatus.tape.squares.length).toBe(2);
  });

  it("should keep the same tape squares id into the new machine status", () => {
    const machineStatus: MachineStatus = new MachineStatus(
      configurationName,
      tape,
      index,
    );

    const newMachineStatus: MachineStatus =
      moveRightOperation.apply(machineStatus);

    expect(newMachineStatus.tape.squares[0].id).toBe(firstSquareId);
    expect(newMachineStatus.tape.squares[1].id).toBe(secondSquareId);
  });

  it("should keep the same tape squares symbol into the new machine status", () => {
    const machineStatus: MachineStatus = new MachineStatus(
      configurationName,
      tape,
      index,
    );

    const newMachineStatus: MachineStatus =
      moveRightOperation.apply(machineStatus);

    expect(newMachineStatus.tape.squares[0].symbol).toBe(firstTapeSymbol);
    expect(newMachineStatus.tape.squares[0].symbol.value).toBe(TapeSymbol.NONE);
    expect(newMachineStatus.tape.squares[1].symbol).toBe(secondTapeSymbol);
    expect(newMachineStatus.tape.squares[1].symbol.value).toBe(TapeSymbol.NONE);
  });

  it("should move the index to the second tape square into the new machine status", () => {
    const machineStatus: MachineStatus = new MachineStatus(
      configurationName,
      tape,
      index,
    );

    const newMachineStatus: MachineStatus =
      moveRightOperation.apply(machineStatus);

    const newIndex = 1;
    expect(newMachineStatus.index).toBe(newIndex);
  });
});
