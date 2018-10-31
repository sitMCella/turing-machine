import { fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { IncreasingOnesAlgorithmService } from './increasing-ones-algorithm.service';
import { AlgorithmEvolutionService } from '../algorithm-evolution.service';
import { MachineStatus } from '../machine-status';
import { Tape } from '../tape';
import { DeepCopy } from '../deep-copy';
import { TapeSymbol } from '../tape-symbol';

describe('IncreasingOnesAlgorithmService', () => {
  let increasingOnesAlgorithmService: IncreasingOnesAlgorithmService;

  beforeEach(() => {
    const algorithmEvolutionService: AlgorithmEvolutionService = new AlgorithmEvolutionService();
    increasingOnesAlgorithmService = new IncreasingOnesAlgorithmService(algorithmEvolutionService);
  });

  it('should initially have completed as false', () => {
    expect(increasingOnesAlgorithmService.completed).toBeFalsy();
  });

  it('should initially have error as false', () => {
    expect(increasingOnesAlgorithmService.error).toBeFalsy();
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

      it('should create 23 machine statuses', fakeAsync(() => {
        const machineStatus: Array<MachineStatus> = [];

        increasingOnesAlgorithmService.evolve(defaultInitialTape).subscribe(
          status => machineStatus.push(status),
          error => new Error(error),
          () => { }
        );
        tick(2300);
        discardPeriodicTasks();

        expect(machineStatus.length).toBe(23);
      }));

      it('should create machine statuses with correct square values', fakeAsync(() => {
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
        tick(2300);
        discardPeriodicTasks();
      }));

      it('should set completed as true on evolution complete', fakeAsync(() => {
        increasingOnesAlgorithmService.evolve(defaultInitialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(2300);
        discardPeriodicTasks();

        expect(increasingOnesAlgorithmService.completed).toBeTruthy();
      }));

      it('should set error as true on evolution error', fakeAsync(() => {
        increasingOnesAlgorithmService.evolve(defaultInitialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(2300);
        discardPeriodicTasks();

        expect(increasingOnesAlgorithmService.error).toBeTruthy();
      }));

      it('should set errorMessage on evolution error', fakeAsync(() => {
        increasingOnesAlgorithmService.evolve(defaultInitialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(2300);
        discardPeriodicTasks();

        expect(increasingOnesAlgorithmService.errorMessage).toBe('Max tape length reached');
      }));

    });

    describe('initial tape with \"1\" as fifth square symbol', () => {

      let deepCopy: DeepCopy;
      let initialTape: Tape;

      beforeEach(() => {
        deepCopy = new DeepCopy();
        initialTape = <Tape>deepCopy.apply(increasingOnesAlgorithmService.getDefaultInitialTape());
        initialTape.squares[4].symbol = new TapeSymbol(TapeSymbol.ONE);
      });

      it('should create 1 machine status', fakeAsync(() => {
        const machineStatus: Array<MachineStatus> = [];

        increasingOnesAlgorithmService.evolve(initialTape).subscribe(
          status => machineStatus.push(status),
          error => new Error(error),
          () => { }
        );
        tick(200);
        discardPeriodicTasks();

        expect(machineStatus.length).toBe(1);
      }));

      it('should create machine statuses with correct square values', fakeAsync(() => {
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
        tick(200);
        discardPeriodicTasks();
      }));

      it('should set completed as true on evolution error', fakeAsync(() => {
        increasingOnesAlgorithmService.evolve(initialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(200);
        discardPeriodicTasks();

        expect(increasingOnesAlgorithmService.completed).toBeTruthy();
      }));

      it('should set error as true on evolution error', fakeAsync(() => {
        increasingOnesAlgorithmService.evolve(initialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(200);
        discardPeriodicTasks();

        expect(increasingOnesAlgorithmService.error).toBeTruthy();
      }));

      it('should set errorMessage on evolution error', fakeAsync(() => {
        increasingOnesAlgorithmService.evolve(initialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(200);
        discardPeriodicTasks();

        expect(increasingOnesAlgorithmService.errorMessage).toBe('Tape already contains a symbol in current index');
      }));

    });

  });

  describe('stop', () => {

    let initialTape: Tape;

    beforeEach(() => {
      initialTape = increasingOnesAlgorithmService.getDefaultInitialTape();
    });

    it('should stop algorithm evolution', fakeAsync(() => {
      const machineStatus: Array<MachineStatus> = [];
      increasingOnesAlgorithmService.evolve(initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => { }
      );
      tick(1000);
      discardPeriodicTasks();

      increasingOnesAlgorithmService.stop();

      expect(machineStatus.length).toBeLessThan(23);
    }));

    it('should set completed as true', fakeAsync(() => {
      increasingOnesAlgorithmService.evolve(initialTape).subscribe(
        status => { },
        error => new Error(error),
        () => { }
      );
      tick(1000);
      discardPeriodicTasks();

      increasingOnesAlgorithmService.stop();

      expect(increasingOnesAlgorithmService.completed).toBeTruthy();
    }));

    it('should set error as false', fakeAsync(() => {
      increasingOnesAlgorithmService.evolve(initialTape).subscribe(
        status => { },
        error => new Error(error),
        () => { }
      );
      tick(1000);
      discardPeriodicTasks();

      increasingOnesAlgorithmService.stop();

      expect(increasingOnesAlgorithmService.error).toBeFalsy();
    }));

  });

  describe('pause', () => {

    it('should stop algorithm evolution', fakeAsync(() => {
      const initialTape = increasingOnesAlgorithmService.getDefaultInitialTape();
      const machineStatus: Array<MachineStatus> = [];
      increasingOnesAlgorithmService.evolve(initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => { }
      );
      tick(1000);
      discardPeriodicTasks();

      increasingOnesAlgorithmService.pause();

      expect(machineStatus.length).toBeLessThan(23);
    }));

  });

  describe('resume', () => {

    it('should resume algorithm evolution', fakeAsync(() => {
      const initialTape = increasingOnesAlgorithmService.getDefaultInitialTape();
      const machineStatus: Array<MachineStatus> = [];
      increasingOnesAlgorithmService.evolve(initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => { }
      );
      tick(1000);
      discardPeriodicTasks();
      increasingOnesAlgorithmService.pause();
      tick(1000);
      discardPeriodicTasks();

      increasingOnesAlgorithmService.resume();
      tick(1300);
      discardPeriodicTasks();

      expect(machineStatus.length).toEqual(23);
    }));

  });

});
