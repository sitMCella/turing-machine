import { IncreasingOnesAlgorithmService } from './increasing-ones-algorithm.service';
import { AlgorithmEvolutionService } from '../algorithm-evolution.service';
import { MachineStatus } from '../machine-status';
import { Configuration } from '../configuration';
import { MoveRightOperation } from '../operations/move-right-operation';
import { PrintSchwaOperation } from '../operations/print-schwa-operation';
import { PrintZeroOperation } from '../operations/print-zero-operation';
import { MoveLeftOperation } from '../operations/move-left-operation';
import { Tape } from '../tape';
import { DeepCopy } from '../deep-copy';
import { TapeSymbol } from '../tape-symbol';
import { IntervalService } from '../interval.service';
import { TimeServiceStub } from '../time-stub.service';

describe('IncreasingOnesAlgorithmService', () => {

  let timeService: TimeServiceStub;
  let increasingOnesAlgorithmService: IncreasingOnesAlgorithmService;

  beforeEach(() => {
    timeService = new TimeServiceStub();
    const intervalService: IntervalService = new IntervalService(timeService);
    const algorithmEvolutionService: AlgorithmEvolutionService = new AlgorithmEvolutionService(intervalService);
    increasingOnesAlgorithmService = new IncreasingOnesAlgorithmService(algorithmEvolutionService);
  });

  it('should initially have completed as false', () => {
    expect(increasingOnesAlgorithmService.completed).toBeFalsy();
  });

  it('should initially have error as false', () => {
    expect(increasingOnesAlgorithmService.error).toBeFalsy();
  });

  it('should get the first configuration', () => {
    const firstConfiguration = increasingOnesAlgorithmService.getFirstConfiguration();
    const expectedFirstConfiguration = new Configuration('b', new TapeSymbol(TapeSymbol.NONE),
    [new PrintSchwaOperation(), new MoveRightOperation(), new PrintSchwaOperation(),
    new MoveRightOperation(), new PrintZeroOperation(), new MoveRightOperation(),
    new MoveRightOperation(), new PrintZeroOperation(), new MoveLeftOperation(),
    new MoveLeftOperation()], 'o');
    expect(firstConfiguration).toEqual(expectedFirstConfiguration);
  });

  describe('getDefaultInitialTape', () => {

    it('should return the default initial tape', () => {
      const tape: Tape = increasingOnesAlgorithmService.getDefaultInitialTape();

      expect(tape).not.toBeNull();
      expect(tape).toBeDefined();
      expect(tape.squares.length).toBe(12);
      for (let i = 0; i < tape.squares.length; i++) {
        expect(tape.squares[i].id).toBe(i + 1);
        expect(tape.squares[i].symbol.value).toBe('');
      }
    });

  });

  describe('evolve', () => {

    describe('default initial tape', () => {

      let defaultInitialTape: Tape;

      beforeEach(() => {
        defaultInitialTape = increasingOnesAlgorithmService.getDefaultInitialTape();
      });

      it('should create 23 machine statuses', () => {
        const machineStatus: Array<MachineStatus> = [];

        increasingOnesAlgorithmService.evolve(defaultInitialTape).subscribe(
          status => machineStatus.push(status),
          error => new Error(error),
          () => { }
        );
        timeService.tick(22);

        expect(machineStatus.length).toBe(23);
      });

      it('should create machine statuses with correct square values', () => {
        const expectedSquareValues: Array<Array<string>> = [
          ['', '', '', '', '', '', '', '', '', '', '', ''],
          ['s', 's', '0', '', '0', '', '', '', '', '', '', ''],
          ['s', 's', '0', '', '0', '', '', '', '', '', '', ''],
          ['s', 's', '0', '', '0', '', '', '', '', '', '', ''],
          ['s', 's', '0', '', '0', '', '', '', '', '', '', ''],
          ['s', 's', '0', '', '0', '', '1', '', '', '', '', ''],
          ['s', 's', '0', '', '0', '', '1', '', '', '', '', ''],
          ['s', 's', '0', '', '0', '', '1', '', '', '', '', ''],
          ['s', 's', '0', '', '0', '', '1', '', '', '', '', ''],
          ['s', 's', '0', '', '0', '', '1', '', '', '', '', ''],
          ['s', 's', '0', '', '0', '', '1', '', '', '', '', ''],
          ['s', 's', '0', '', '0', '', '1', '', '', '', '', ''],
          ['s', 's', '0', '', '0', '', '1', '', '0', '', '', ''],
          ['s', 's', '0', '', '0', '', '1', 'x', '0', '', '', ''],
          ['s', 's', '0', '', '0', '', '1', 'x', '0', '', '', ''],
          ['s', 's', '0', '', '0', '', '1', 'x', '0', '', '', ''],
          ['s', 's', '0', '', '0', '', '1', 'x', '0', '', '', ''],
          ['s', 's', '0', '', '0', '', '1', 'x', '0', '', '', ''],
          ['s', 's', '0', '', '0', '', '1', 'x', '0', '', '1', ''],
          ['s', 's', '0', '', '0', '', '1', 'x', '0', '', '1', ''],
          ['s', 's', '0', '', '0', '', '1', '', '0', '', '1', ''],
          ['s', 's', '0', '', '0', '', '1', '', '0', '', '1', ''],
          ['s', 's', '0', '', '0', '', '1', '', '0', '', '1', '']
        ];
        const expectedTapeIndexes: Array<number> = [0, 2, 2, 4, 6, 5, 3, 1, 2, 4, 6, 8, 6, 4, 4, 6, 8, 10, 9, 7, 8, 10, 12, 12];
        const machineStatus: Array<MachineStatus> = [];

        increasingOnesAlgorithmService.evolve(defaultInitialTape).subscribe(
          status => machineStatus.push(status),
          error => new Error(error),
          () => {
            for (let tapeIndex = 0; tapeIndex < 23; tapeIndex++) {
              expect(machineStatus[tapeIndex].tape.squares.length).toEqual(12);
              for (let squareIndex = 0; squareIndex < 12; squareIndex++) {
                expect(machineStatus[tapeIndex].tape.squares[squareIndex].id).toBe(squareIndex + 1);
                expect(machineStatus[tapeIndex].tape.squares[squareIndex].symbol.value).toBe(expectedSquareValues[tapeIndex][squareIndex]);
              }
              expect(machineStatus[tapeIndex].index).toBe(expectedTapeIndexes[tapeIndex]);
            }
          }
        );
        timeService.tick(22);
      });

      it('should set completed as true on evolution complete', () => {
        increasingOnesAlgorithmService.evolve(defaultInitialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        timeService.tick(22);

        expect(increasingOnesAlgorithmService.completed).toBeTruthy();
      });

      it('should set error as true on evolution error', () => {
        increasingOnesAlgorithmService.evolve(defaultInitialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        timeService.tick(22);

        expect(increasingOnesAlgorithmService.error).toBeTruthy();
      });

      it('should set errorMessage on evolution error', () => {
        increasingOnesAlgorithmService.evolve(defaultInitialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        timeService.tick(22);

        expect(increasingOnesAlgorithmService.errorMessage).toBe('Max tape length reached');
      });

    });

    describe('initial tape with \"1\" as fifth square symbol', () => {

      let deepCopy: DeepCopy;
      let initialTape: Tape;

      beforeEach(() => {
        deepCopy = new DeepCopy();
        initialTape = <Tape>deepCopy.apply(increasingOnesAlgorithmService.getDefaultInitialTape());
        initialTape.squares[4].symbol = new TapeSymbol(TapeSymbol.ONE);
      });

      it('should create 1 machine status', () => {
        const machineStatus: Array<MachineStatus> = [];

        increasingOnesAlgorithmService.evolve(initialTape).subscribe(
          status => machineStatus.push(status),
          error => new Error(error),
          () => { }
        );
        timeService.tick(1);

        expect(machineStatus.length).toBe(1);
      });

      it('should create machine statuses with correct square values', () => {
        const expectedSquareValues: Array<Array<string>> = [
          ['', '', '', '', '1', '', '', '', '', '', '', '']
        ];
        const machineStatus: Array<MachineStatus> = [];

        increasingOnesAlgorithmService.evolve(initialTape).subscribe(
          status => machineStatus.push(status),
          error => new Error(error),
          () => {
            expect(machineStatus[0].tape.squares.length).toEqual(12);
            for (let squareIndex = 0; squareIndex < 12; squareIndex++) {
              expect(machineStatus[0].tape.squares[squareIndex].id).toBe(squareIndex + 1);
              expect(machineStatus[0].tape.squares[squareIndex].symbol.value).toBe(expectedSquareValues[0][squareIndex]);
            }
            expect(machineStatus[0].index).toBe(0);
          }
        );
        timeService.tick(1);
      });

      it('should set completed as true on evolution error', () => {
        increasingOnesAlgorithmService.evolve(initialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        timeService.tick(1);

        expect(increasingOnesAlgorithmService.completed).toBeTruthy();
      });

      it('should set error as true on evolution error', () => {
        increasingOnesAlgorithmService.evolve(initialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        timeService.tick(1);

        expect(increasingOnesAlgorithmService.error).toBeTruthy();
      });

      it('should set errorMessage on evolution error', () => {
        increasingOnesAlgorithmService.evolve(initialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        timeService.tick(1);

        expect(increasingOnesAlgorithmService.errorMessage).toBe('Tape already contains a symbol in current index');
      });

    });

  });

  describe('stop', () => {

    let initialTape: Tape;

    beforeEach(() => {
      initialTape = increasingOnesAlgorithmService.getDefaultInitialTape();
    });

    it('should stop algorithm evolution', () => {
      const machineStatus: Array<MachineStatus> = [];
      increasingOnesAlgorithmService.evolve(initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => { }
      );
      timeService.tick(10);

      increasingOnesAlgorithmService.stop();

      expect(machineStatus.length).toBeLessThan(23);
    });

    it('should set completed as true', () => {
      increasingOnesAlgorithmService.evolve(initialTape).subscribe(
        status => { },
        error => new Error(error),
        () => { }
      );
      timeService.tick(10);

      increasingOnesAlgorithmService.stop();

      expect(increasingOnesAlgorithmService.completed).toBeTruthy();
    });

    it('should set error as false', () => {
      increasingOnesAlgorithmService.evolve(initialTape).subscribe(
        status => { },
        error => new Error(error),
        () => { }
      );
      timeService.tick(10);

      increasingOnesAlgorithmService.stop();

      expect(increasingOnesAlgorithmService.error).toBeFalsy();
    });

  });

  describe('pause', () => {

    it('should stop algorithm evolution', () => {
      const initialTape = increasingOnesAlgorithmService.getDefaultInitialTape();
      const machineStatus: Array<MachineStatus> = [];
      increasingOnesAlgorithmService.evolve(initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => { }
      );
      timeService.tick(10);

      increasingOnesAlgorithmService.pause();

      expect(machineStatus.length).toBeLessThan(23);
    });

  });

  describe('resume', () => {

    it('should resume algorithm evolution', () => {
      const initialTape = increasingOnesAlgorithmService.getDefaultInitialTape();
      const machineStatus: Array<MachineStatus> = [];
      increasingOnesAlgorithmService.evolve(initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => { }
      );
      timeService.tick(10);
      increasingOnesAlgorithmService.pause();

      increasingOnesAlgorithmService.resume();
      timeService.tick(12);

      expect(machineStatus.length).toEqual(23);
    });

  });

});
