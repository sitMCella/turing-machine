import { AlgorithmEvolutionService } from "./algorithm-evolution.service";
import { Configuration } from "./configuration";
import { MachineStatus } from "./machine-status";
import { Tape } from "./tape";
import { Square } from "./square";
import { TapeSymbol } from "./tape-symbol";
import { PrintOneOperation } from "./operations/print-one-operation";
import { MoveRightOperation } from "./operations/move-right-operation";
import { PrintZeroOperation } from "./operations/print-zero-operation";
import { IntervalService } from "./interval.service";
import { TimeServiceStub } from "./time-stub.service";

describe("AlgorithmEvolutionService", () => {
  let timeService: TimeServiceStub;
  let algorithmEvolutionService: AlgorithmEvolutionService;
  let configurations: Array<Configuration>;
  let initialTape: Tape;

  beforeEach(() => {
    timeService = new TimeServiceStub();
    const intervalService: IntervalService = new IntervalService(timeService);
    algorithmEvolutionService = new AlgorithmEvolutionService(intervalService);

    const firstConfiguration = new Configuration(
      "b",
      new TapeSymbol(TapeSymbol.NONE),
      [new PrintZeroOperation(), new MoveRightOperation()],
      "c",
    );
    const secondConfiguration = new Configuration(
      "c",
      new TapeSymbol(TapeSymbol.NONE),
      [new MoveRightOperation()],
      "e",
    );
    const thirdConfiguration = new Configuration(
      "e",
      new TapeSymbol(TapeSymbol.NONE),
      [new PrintOneOperation(), new MoveRightOperation()],
      "f",
    );
    const fourthConfiguration = new Configuration(
      "f",
      new TapeSymbol(TapeSymbol.NONE),
      [new MoveRightOperation()],
      "b",
    );
    configurations = [
      firstConfiguration,
      secondConfiguration,
      thirdConfiguration,
      fourthConfiguration,
    ];

    const squares: Array<Square> = [];
    for (let i = 0; i < 10; i++) {
      squares[i] = new Square(i + 1, new TapeSymbol(TapeSymbol.NONE));
    }
    initialTape = new Tape(squares);
  });

  it("should initially have completed as false", () => {
    expect(algorithmEvolutionService.completed).toBeFalsy();
  });

  it("should initially have error as false", () => {
    expect(algorithmEvolutionService.error).toBeFalsy();
  });

  describe("evolve", () => {
    it("should create 11 machine statuses", () => {
      const machineStatus: Array<MachineStatus> = [];
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        (status) => machineStatus.push(status),
        (error) => new Error(error),
        () => {},
      );
      timeService.tick(10);

      expect(machineStatus.length).toBe(11);
    });

    it("should create machine statuses with correct square values", () => {
      const expectedSquareValues: Array<Array<string>> = [
        ["", "", "", "", "", "", "", "", "", ""],
        ["0", "", "", "", "", "", "", "", "", ""],
        ["0", "", "", "", "", "", "", "", "", ""],
        ["0", "", "1", "", "", "", "", "", "", ""],
        ["0", "", "1", "", "", "", "", "", "", ""],
        ["0", "", "1", "", "0", "", "", "", "", ""],
        ["0", "", "1", "", "0", "", "", "", "", ""],
        ["0", "", "1", "", "0", "", "1", "", "", ""],
        ["0", "", "1", "", "0", "", "1", "", "", ""],
        ["0", "", "1", "", "0", "", "1", "", "0", ""],
        ["0", "", "1", "", "0", "", "1", "", "0", ""],
      ];
      const machineStatus: Array<MachineStatus> = [];

      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        (status) => machineStatus.push(status),
        (error) => new Error(error),
      );
      timeService.tick(10);

      for (let tapeIndex = 0; tapeIndex < 11; tapeIndex++) {
        expect(machineStatus[tapeIndex].tape.squares.length).toEqual(10);
        for (let squareIndex = 0; squareIndex < 10; squareIndex++) {
          expect(machineStatus[tapeIndex].tape.squares[squareIndex].id).toBe(
            squareIndex + 1,
          );
          expect(
            machineStatus[tapeIndex].tape.squares[squareIndex].symbol.value,
          ).toBe(expectedSquareValues[tapeIndex][squareIndex]);
        }
        expect(machineStatus[tapeIndex].index).toBe(tapeIndex);
      }
    });

    it("should set completed as true on evolution error", () => {
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        (status) => {},
        (error) => new Error(error),
        () => {},
      );
      timeService.tick(10);

      expect(algorithmEvolutionService.completed).toBeTruthy();
    });

    it("should set error as true on evolution error", () => {
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        (status) => {},
        (error) => new Error(error),
        () => {},
      );
      timeService.tick(10);

      expect(algorithmEvolutionService.error).toBeTruthy();
    });
  });

  describe("stop", () => {
    it("should stop algorithm evolution", () => {
      const machineStatus: Array<MachineStatus> = [];
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        (status) => machineStatus.push(status),
        (error) => new Error(error),
        () => {},
      );
      timeService.tick(3);

      algorithmEvolutionService.stop();

      expect(machineStatus.length).toBeLessThan(11);
    });

    it("should set completed as true", () => {
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        (status) => {},
        (error) => new Error(error),
        () => {},
      );
      timeService.tick(3);

      algorithmEvolutionService.stop();

      expect(algorithmEvolutionService.completed).toBeTruthy();
    });

    it("should set error as false", () => {
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        (status) => {},
        (error) => new Error(error),
        () => {},
      );
      timeService.tick(3);

      algorithmEvolutionService.stop();

      expect(algorithmEvolutionService.error).toBeFalsy();
    });
  });

  describe("pause", () => {
    it("should stop algorithm evolution", () => {
      const machineStatus: Array<MachineStatus> = [];
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        (status) => machineStatus.push(status),
        (error) => new Error(error),
        () => {},
      );
      timeService.tick(3);

      algorithmEvolutionService.pause();

      expect(machineStatus.length).toBeLessThan(11);
    });

    it("should not set completed as true", () => {
      const machineStatus: Array<MachineStatus> = [];
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        (status) => machineStatus.push(status),
        (error) => new Error(error),
        () => {},
      );
      timeService.tick(3);

      algorithmEvolutionService.pause();

      expect(algorithmEvolutionService.completed).toBeFalsy();
    });
  });

  describe("resume", () => {
    it("should resume algorithm evolution", () => {
      const machineStatus: Array<MachineStatus> = [];
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        (status) => machineStatus.push(status),
        (error) => new Error(error),
        () => {},
      );
      timeService.tick(3);
      algorithmEvolutionService.pause();

      algorithmEvolutionService.resume();
      timeService.tick(7);

      expect(machineStatus.length).toEqual(11);
    });
  });
});
