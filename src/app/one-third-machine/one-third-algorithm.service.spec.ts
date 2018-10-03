import { fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { OneThirdAlgorithmService } from './one-third-algorithm.service';
import { AlgorithmEvolutionService } from '../algorithm-evolution.service';
import { MachineStatus } from '../machine-status';
import { Tape } from '../tape';
import { TapeSymbol } from '../tape-symbol';
import { DeepCopy } from '../deep-copy';

describe('OneThirdAlgorithmService', () => {
  let oneThirdAlgorithmService: OneThirdAlgorithmService;

  beforeEach(() => {
    const algorithmEvolutionService: AlgorithmEvolutionService = new AlgorithmEvolutionService();
    oneThirdAlgorithmService = new OneThirdAlgorithmService(algorithmEvolutionService);
  });

  it('should initially have completed as false', () => {
    expect(oneThirdAlgorithmService.completed).toBeFalsy();
  });

  it('should initially have error as false', () => {
    expect(oneThirdAlgorithmService.error).toBeFalsy();
  });

  describe('getDefaultInitialTape', () => {

    it('should return the default initial tape', () => {
      const tape: Tape = oneThirdAlgorithmService.getDefaultInitialTape();

      expect(tape).not.toBeNull();
      expect(tape).toBeDefined();
      expect(tape.squares.length).toBe(20);
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
        defaultInitialTape = oneThirdAlgorithmService.getDefaultInitialTape();
      });

      it('should create 21 machine statuses', fakeAsync(() => {
        const machineStatus: Array<MachineStatus> = [];

        oneThirdAlgorithmService.evolve(defaultInitialTape).subscribe(
          status => machineStatus.push(status),
          error => new Error(error),
          () => { }
        );
        tick(2100);
        discardPeriodicTasks();

        expect(machineStatus.length).toBe(21);
      }));

      it('should create machine statuses with correct square values', fakeAsync(() => {
        const expectedSquareValues: Array<Array<string>> = [
          ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '1', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '1', '']
        ];
        const machineStatus: Array<MachineStatus> = [];

        oneThirdAlgorithmService.evolve(defaultInitialTape).subscribe(
          status => machineStatus.push(status),
          error => new Error(error),
          () => {
            for (let tapeIndex = 0; tapeIndex < 21; tapeIndex++) {
              expect(machineStatus[tapeIndex].tape.squares.length).toEqual(20);
              for (let squareIndex = 0; squareIndex < 20; squareIndex++) {
                expect(machineStatus[tapeIndex].tape.squares[squareIndex].id).toBe(squareIndex + 1);
                expect(machineStatus[tapeIndex].tape.squares[squareIndex].symbol.value).toBe(expectedSquareValues[tapeIndex][squareIndex]);
              }
              expect(machineStatus[tapeIndex].index).toBe(tapeIndex);
            }
          }
        );
        tick(2100);
        discardPeriodicTasks();
      }));

      it('should set completed as true on evolution error', fakeAsync(() => {
        oneThirdAlgorithmService.evolve(defaultInitialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(2100);
        discardPeriodicTasks();

        expect(oneThirdAlgorithmService.completed).toBeTruthy();
      }));

      it('should set error as true on evolution error', fakeAsync(() => {
        oneThirdAlgorithmService.evolve(defaultInitialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(2100);
        discardPeriodicTasks();

        expect(oneThirdAlgorithmService.error).toBeTruthy();
      }));

      it('should set errorMessage on evolution error', fakeAsync(() => {
        oneThirdAlgorithmService.evolve(defaultInitialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(2100);
        discardPeriodicTasks();

        expect(oneThirdAlgorithmService.errorMessage).toBe('Max tape lenght reached');
      }));

    });

    describe('initial tape with \"1\" as second square symbol', () => {

      let deepCopy: DeepCopy;
      let initialTape: Tape;

      beforeEach(() => {
        deepCopy = new DeepCopy();
        initialTape = <Tape>deepCopy.apply(oneThirdAlgorithmService.getDefaultInitialTape());
        initialTape.squares[1].symbol = new TapeSymbol(TapeSymbol.ONE);
      });

      it('should create 2 machine statuses', fakeAsync(() => {
        const machineStatus: Array<MachineStatus> = [];

        oneThirdAlgorithmService.evolve(initialTape).subscribe(
          status => machineStatus.push(status),
          error => new Error(error),
          () => { }
        );
        tick(200);
        discardPeriodicTasks();

        expect(machineStatus.length).toBe(2);
      }));

      it('should create machine statuses with correct square values', fakeAsync(() => {
        const expectedSquareValues: Array<Array<string>> = [
          ['', '1', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '1', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
        ];
        const machineStatus: Array<MachineStatus> = [];

        oneThirdAlgorithmService.evolve(initialTape).subscribe(
          status => machineStatus.push(status),
          error => new Error(error),
          () => {
            for (let tapeIndex = 0; tapeIndex < 2; tapeIndex++) {
              expect(machineStatus[tapeIndex].tape.squares.length).toEqual(20);
              for (let squareIndex = 0; squareIndex < 20; squareIndex++) {
                expect(machineStatus[tapeIndex].tape.squares[squareIndex].id).toBe(squareIndex + 1);
                expect(machineStatus[tapeIndex].tape.squares[squareIndex].symbol.value).toBe(expectedSquareValues[tapeIndex][squareIndex]);
              }
              expect(machineStatus[tapeIndex].index).toBe(tapeIndex);
            }
          }
        );
        tick(200);
        discardPeriodicTasks();
      }));

      it('should set completed as true on evolution error', fakeAsync(() => {
        oneThirdAlgorithmService.evolve(initialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(200);
        discardPeriodicTasks();

        expect(oneThirdAlgorithmService.completed).toBeTruthy();
      }));

      it('should set error as true on evolution error', fakeAsync(() => {
        oneThirdAlgorithmService.evolve(initialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(200);
        discardPeriodicTasks();

        expect(oneThirdAlgorithmService.error).toBeTruthy();
      }));

      it('should set errorMessage on evolution error', fakeAsync(() => {
        oneThirdAlgorithmService.evolve(initialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(200);
        discardPeriodicTasks();

        expect(oneThirdAlgorithmService.errorMessage).toBe('Cannot find m-configuration with name c and symbol 1');
      }));

    });

  });

  describe('stop', () => {

    let initialTape: Tape;

    beforeEach(() => {
      initialTape = oneThirdAlgorithmService.getDefaultInitialTape();
    });

    it('should stop algorithm evolution', fakeAsync(() => {
      const machineStatus: Array<MachineStatus> = [];
      oneThirdAlgorithmService.evolve(initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => { }
      );
      tick(1000);
      discardPeriodicTasks();

      oneThirdAlgorithmService.stop();

      expect(machineStatus.length).toBeLessThan(21);
    }));

    it('should set completed as true', fakeAsync(() => {
      oneThirdAlgorithmService.evolve(initialTape).subscribe(
        status => { },
        error => new Error(error),
        () => { }
      );
      tick(1000);
      discardPeriodicTasks();

      oneThirdAlgorithmService.stop();

      expect(oneThirdAlgorithmService.completed).toBeTruthy();
    }));

    it('should set error as false', fakeAsync(() => {
      oneThirdAlgorithmService.evolve(initialTape).subscribe(
        status => { },
        error => new Error(error),
        () => { }
      );
      tick(1000);
      discardPeriodicTasks();

      oneThirdAlgorithmService.stop();

      expect(oneThirdAlgorithmService.error).toBeFalsy();
    }));

  });

  describe('pause', () => {

    it('should stop algorithm evolution', fakeAsync(() => {
      const initialTape = oneThirdAlgorithmService.getDefaultInitialTape();
      const machineStatus: Array<MachineStatus> = [];
      oneThirdAlgorithmService.evolve(initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => { }
      );
      tick(1000);
      discardPeriodicTasks();

      oneThirdAlgorithmService.pause();

      expect(machineStatus.length).toBeLessThan(21);
    }));

  });

  describe('resume', () => {

    it('should resume algorithm evolution', fakeAsync(() => {
      const initialTape = oneThirdAlgorithmService.getDefaultInitialTape();
      const machineStatus: Array<MachineStatus> = [];
      oneThirdAlgorithmService.evolve(initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => { }
      );
      tick(1000);
      discardPeriodicTasks();
      oneThirdAlgorithmService.pause();
      tick(1000);
      discardPeriodicTasks();

      oneThirdAlgorithmService.resume();
      tick(1100);
      discardPeriodicTasks();

      expect(machineStatus.length).toEqual(21);
    }));

  });

});
