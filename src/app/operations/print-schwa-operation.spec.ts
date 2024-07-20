import { Square } from "../square";
import { Tape } from "../tape";
import { MachineStatus } from "../machine-status";
import { PrintSchwaOperation } from "./print-schwa-operation";
import { TapeSymbol } from "../tape-symbol";

describe("PrintSchwaOperation", () => {
  const configurationName = "configuration name";
  const squareId = 1;
  const tapeSymbol: TapeSymbol = new TapeSymbol(TapeSymbol.NONE);
  const index = 0;

  let printSchwaOperation: PrintSchwaOperation;

  beforeEach(() => {
    printSchwaOperation = new PrintSchwaOperation();
  });

  it("should the new machine status be the same object as the initial machine status", () => {
    const squares: Array<Square> = [new Square(squareId, tapeSymbol)];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(
      configurationName,
      tape,
      index,
    );

    const newMachineStatus: MachineStatus =
      printSchwaOperation.apply(machineStatus);

    expect(newMachineStatus).toBe(machineStatus);
  });

  it("should keep the same configuration name into the new machine status", () => {
    const squares: Array<Square> = [new Square(squareId, tapeSymbol)];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(
      configurationName,
      tape,
      index,
    );

    const newMachineStatus: MachineStatus =
      printSchwaOperation.apply(machineStatus);

    expect(newMachineStatus.configurationName).toBe(configurationName);
  });

  it("should keep the same tape squares count into the new machine status", () => {
    const squares: Array<Square> = [new Square(squareId, tapeSymbol)];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(
      configurationName,
      tape,
      index,
    );

    const newMachineStatus: MachineStatus =
      printSchwaOperation.apply(machineStatus);

    expect(newMachineStatus.tape.squares.length).toBe(1);
  });

  it("should keep the same tape square id into the new machine status", () => {
    const squares: Array<Square> = [new Square(squareId, tapeSymbol)];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(
      configurationName,
      tape,
      index,
    );

    const newMachineStatus: MachineStatus =
      printSchwaOperation.apply(machineStatus);

    expect(newMachineStatus.tape.squares[0].id).toBe(squareId);
  });

  it("should have a different tape square symbol into the new machine status", () => {
    const squares: Array<Square> = [new Square(squareId, tapeSymbol)];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(
      configurationName,
      tape,
      index,
    );

    const newMachineStatus: MachineStatus =
      printSchwaOperation.apply(machineStatus);

    expect(newMachineStatus.tape.squares[0].symbol).not.toBe(tapeSymbol);
  });

  it("should print character s into the index tape square", () => {
    const squares: Array<Square> = [new Square(squareId, tapeSymbol)];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(
      configurationName,
      tape,
      index,
    );

    const newMachineStatus: MachineStatus =
      printSchwaOperation.apply(machineStatus);

    expect(newMachineStatus.tape.squares[0].symbol.value).toBe(
      TapeSymbol.SCHWA,
    );
  });

  it("should keep the same index into the new machine status", () => {
    const squares: Array<Square> = [new Square(squareId, tapeSymbol)];
    const tape: Tape = new Tape(squares);
    const machineStatus: MachineStatus = new MachineStatus(
      configurationName,
      tape,
      index,
    );

    const newMachineStatus: MachineStatus =
      printSchwaOperation.apply(machineStatus);

    expect(newMachineStatus.index).toBe(index);
  });

  it("should throw Error if tape already contains a symbol in current index", () => {
    const squaresError: Array<Square> = [
      new Square(1, new TapeSymbol(TapeSymbol.ONE)),
    ];
    const tapeError: Tape = new Tape(squaresError);
    const machineStatusError: MachineStatus = new MachineStatus(
      configurationName,
      tapeError,
      0,
    );

    const apply = function () {
      printSchwaOperation.apply(machineStatusError);
    };

    expect(apply).toThrow(
      new Error("Tape already contains a symbol in current index"),
    );
  });
});
