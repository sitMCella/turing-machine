import { TestBed, inject, async, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { OneThirdAlgorithmSingleMConfigService } from './one-third-algorithm-single-m-config.service';
import { AlgorithmEvolutionService } from '../algorithm-evolution.service';
import { MachineStatus } from '../machine-status';
import { Tape } from '../tape';
import { Square } from '../square';
import { DeepCopy } from '../deep-copy';
import { TapeSymbol } from '../tape-symbol';

describe('OneThirdAlgorithmSingleMConfigService', () => {
  let oneThirdAlgorithmSingleMConfigService: OneThirdAlgorithmSingleMConfigService;

  beforeEach(() => {
    const algorithmEvolutionService: AlgorithmEvolutionService = new AlgorithmEvolutionService();
    oneThirdAlgorithmSingleMConfigService = new OneThirdAlgorithmSingleMConfigService(algorithmEvolutionService);
  });

  it('should initially have completed as false', () => {
    expect(oneThirdAlgorithmSingleMConfigService.completed).toBeFalsy();
  });

  it('should initially have error as false', () => {
    expect(oneThirdAlgorithmSingleMConfigService.error).toBeFalsy();
  });

  describe('getDefaultInitialTape', () => {

    it('should return the default initial tape', () => {
      const tape: Tape = oneThirdAlgorithmSingleMConfigService.getDefaultInitialTape();

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
        defaultInitialTape = oneThirdAlgorithmSingleMConfigService.getDefaultInitialTape();
      });

      it('should create 11 machine statuses', fakeAsync(() => {
        const machineStatus: Array<MachineStatus> = [];

        oneThirdAlgorithmSingleMConfigService.evolve(defaultInitialTape).subscribe(
          status => machineStatus.push(status),
          error => new Error(error),
          () => { }
        );
        tick(1100);
        discardPeriodicTasks();

        expect(machineStatus.length).toBe(11);
      }));

      it('should create machine statuses with correct square values', fakeAsync(() => {
        const expectedSquareValues: Array<Array<string>> = [
          ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '', ''],
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '1', '']
        ];
        const machineStatus: Array<MachineStatus> = [];
        let expectedIndex = -2;

        oneThirdAlgorithmSingleMConfigService.evolve(defaultInitialTape).subscribe(
          status => machineStatus.push(status),
          error => new Error(error),
          () => {
            for (let tapeIndex = 0; tapeIndex < 12; tapeIndex++ , expectedIndex += 2) {
              expect(machineStatus[tapeIndex].tape.squares.length).toEqual(20);
              for (let squareIndex = 0; squareIndex < 20; squareIndex++) {
                expect(machineStatus[tapeIndex].tape.squares[squareIndex].id).toBe(squareIndex + 1);
                expect(machineStatus[tapeIndex].tape.squares[squareIndex].symbol.value).toBe(expectedSquareValues[tapeIndex][squareIndex]);
              }
              if (tapeIndex === 0) {
                expect(machineStatus[tapeIndex].index).toBe(0);
              } else {
                expect(machineStatus[tapeIndex].index).toBe(expectedIndex);
              }
            }
          }
        );
        tick(1100);
        discardPeriodicTasks();
      }));

      it('should set completed as true on evolution error', fakeAsync(() => {
        oneThirdAlgorithmSingleMConfigService.evolve(defaultInitialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(1100);
        discardPeriodicTasks();

        expect(oneThirdAlgorithmSingleMConfigService.completed).toBeTruthy();
      }));

      it('should set error as true on evolution error', fakeAsync(() => {
        oneThirdAlgorithmSingleMConfigService.evolve(defaultInitialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(1100);
        discardPeriodicTasks();

        expect(oneThirdAlgorithmSingleMConfigService.error).toBeTruthy();
      }));

      it('should set errorMessage on evolution error', fakeAsync(() => {
        oneThirdAlgorithmSingleMConfigService.evolve(defaultInitialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(1100);
        discardPeriodicTasks();

        expect(oneThirdAlgorithmSingleMConfigService.errorMessage).toBe('Cannot read symbol on square with index 21');
      }));

    });

    describe('initial tape with \"1\" as second square symbol', () => {

      let deepCopy: DeepCopy;
      let initialTape: Tape;

      beforeEach(() => {
        deepCopy = new DeepCopy();
        initialTape = <Tape>deepCopy.apply(oneThirdAlgorithmSingleMConfigService.getDefaultInitialTape());
        initialTape.squares[0].symbol = new TapeSymbol(TapeSymbol.ONE);
      });

      it('should create 1 machine status', fakeAsync(() => {
        const machineStatus: Array<MachineStatus> = [];

        oneThirdAlgorithmSingleMConfigService.evolve(initialTape).subscribe(
          status => machineStatus.push(status),
          error => new Error(error),
          () => { }
        );
        tick(200);
        discardPeriodicTasks();

        expect(machineStatus.length).toBe(1);
      }));

      it('should create machine status with correct square values', fakeAsync(() => {
        const expectedSquareValues: Array<Array<string>> = [
          ['1', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
        ];
        const machineStatus: Array<MachineStatus> = [];

        oneThirdAlgorithmSingleMConfigService.evolve(initialTape).subscribe(
          status => machineStatus.push(status),
          error => new Error(error),
          () => {
            expect(machineStatus[0].tape.squares.length).toEqual(20);
            for (let squareIndex = 0; squareIndex < 20; squareIndex++) {
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
        oneThirdAlgorithmSingleMConfigService.evolve(initialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(200);
        discardPeriodicTasks();

        expect(oneThirdAlgorithmSingleMConfigService.completed).toBeTruthy();
      }));

      it('should set error as true on evolution error', fakeAsync(() => {
        oneThirdAlgorithmSingleMConfigService.evolve(initialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(200);
        discardPeriodicTasks();

        expect(oneThirdAlgorithmSingleMConfigService.error).toBeTruthy();
      }));

      it('should set errorMessage on evolution error', fakeAsync(() => {
        oneThirdAlgorithmSingleMConfigService.evolve(initialTape).subscribe(
          status => { },
          error => new Error(error),
          () => { }
        );
        tick(200);
        discardPeriodicTasks();

        expect(oneThirdAlgorithmSingleMConfigService.errorMessage).toBe('Tape already contains a symbol in current index');
      }));

    });

  });

  describe('stop', () => {

    let initialTape: Tape;

    beforeEach(() => {
      initialTape = oneThirdAlgorithmSingleMConfigService.getDefaultInitialTape();
    });

    it('should stop algorithm evolution', fakeAsync(() => {
      const machineStatus: Array<MachineStatus> = [];
      oneThirdAlgorithmSingleMConfigService.evolve(initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => { }
      );
      tick(500);
      discardPeriodicTasks();

      oneThirdAlgorithmSingleMConfigService.stop();

      expect(machineStatus.length).toBeLessThan(11);
    }));

    it('should set completed as true', fakeAsync(() => {
      oneThirdAlgorithmSingleMConfigService.evolve(initialTape).subscribe(
        status => { },
        error => new Error(error),
        () => { }
      );
      tick(500);
      discardPeriodicTasks();

      oneThirdAlgorithmSingleMConfigService.stop();

      expect(oneThirdAlgorithmSingleMConfigService.completed).toBeTruthy();
    }));

    it('should set error as false', fakeAsync(() => {
      oneThirdAlgorithmSingleMConfigService.evolve(initialTape).subscribe(
        status => { },
        error => new Error(error),
        () => { }
      );
      tick(500);
      discardPeriodicTasks();

      oneThirdAlgorithmSingleMConfigService.stop();

      expect(oneThirdAlgorithmSingleMConfigService.error).toBeFalsy();
    }));

  });

  describe('pause', () => {

    it('should stop algorithm evolution', fakeAsync(() => {
      const initialTape = oneThirdAlgorithmSingleMConfigService.getDefaultInitialTape();
      const machineStatus: Array<MachineStatus> = [];
      oneThirdAlgorithmSingleMConfigService.evolve(initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => { }
      );
      tick(500);
      discardPeriodicTasks();

      oneThirdAlgorithmSingleMConfigService.pause();

      expect(machineStatus.length).toBeLessThan(11);
    }));

  });

  describe('resume', () => {

    it('should resume algorithm evolution', fakeAsync(() => {
      const initialTape = oneThirdAlgorithmSingleMConfigService.getDefaultInitialTape();
      const machineStatus: Array<MachineStatus> = [];
      oneThirdAlgorithmSingleMConfigService.evolve(initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => { }
      );
      tick(500);
      discardPeriodicTasks();
      oneThirdAlgorithmSingleMConfigService.pause();
      tick(1000);
      discardPeriodicTasks();

      oneThirdAlgorithmSingleMConfigService.resume();
      tick(600);
      discardPeriodicTasks();

      expect(machineStatus.length).toEqual(11);
    }));

  });

});
