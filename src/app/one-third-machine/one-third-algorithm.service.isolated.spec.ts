import { TestBed, inject, async } from '@angular/core/testing';
import { OneThirdAlgorithmService } from './one-third-algorithm.service';
import { MachineStatus } from '../machine-status';
import { Tape } from '../tape';
import { Square } from '../square';
import { DeepCopy } from '../deep-copy';

describe('OneThirdAlgorithmService', () => {
  let oneThirdAlgorithmService: OneThirdAlgorithmService;

  beforeEach(() => {
    oneThirdAlgorithmService = new OneThirdAlgorithmService();
  });

  it('should have an initial max iterations value set to 20', async(() => {
    expect(oneThirdAlgorithmService.maxIterations).toBe(20);
  }));

  it('should initially have completed as false', () => {
    expect(oneThirdAlgorithmService.completed).toBeFalsy();
  });

  it('should set max iterations value to 4', async(() => {
    oneThirdAlgorithmService.maxIterations = 4;

    expect(oneThirdAlgorithmService.maxIterations).toBe(4);
  }));

  describe('getDefaultInitialTape', () => {

    it('should return the default initial tape', () => {
      const tape: Tape = oneThirdAlgorithmService.getDefaultInitialTape();
      expect(tape).not.toBeNull();
      expect(tape).not.toBeUndefined();
      expect(tape.squares.length).toBe(20);
      for (let i = 0; i < tape.squares.length; i++) {
        expect(tape.squares[i].id).toBe(i + 1);
        expect(tape.squares[i].value).toBe('');
      }
    });

  });

  describe('evolve', () => {

    describe('default initial tape', () => {

      it('should create 20 machine statuses', async(() => {
        const machineStatus: Array<MachineStatus> = [];
        oneThirdAlgorithmService.machineStatusObservable.subscribe(
          status => machineStatus.push(status),
          error => console.log(error),
          () => { }
        );

        oneThirdAlgorithmService.evolve(oneThirdAlgorithmService.getDefaultInitialTape());

        expect(machineStatus.length).toBe(20);
      }));

      it('should create machine statuses', async(() => {
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
          ['0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '1', '', '0', '', '1', '']
        ];

        let tapeIndex = 0;
        oneThirdAlgorithmService.machineStatusObservable.subscribe(status => {
          for (let squareIndex = 0; squareIndex < status.tape.squares.length; squareIndex++) {
            expect(status.tape.squares[squareIndex].id).toBe(squareIndex + 1);
            expect(status.tape.squares[squareIndex].value).toBe(expectedSquareValues[tapeIndex][squareIndex]);
          }
          expect(status.index).toBe(tapeIndex);
          tapeIndex++;
        });

        oneThirdAlgorithmService.evolve(oneThirdAlgorithmService.getDefaultInitialTape());
      }));

      it('should set completed as true when evolution is complete', async(() => {
        oneThirdAlgorithmService.evolve(oneThirdAlgorithmService.getDefaultInitialTape());

        oneThirdAlgorithmService.machineStatusObservable.subscribe(
          status => { },
          error => console.log(error),
          () => { }
        );

        expect(oneThirdAlgorithmService.completed).toBeTruthy();
      }));

      it('should set eror as false when evolution is complete', async(() => {
        oneThirdAlgorithmService.evolve(oneThirdAlgorithmService.getDefaultInitialTape());

        oneThirdAlgorithmService.machineStatusObservable.subscribe(
          status => { },
          error => console.log(error),
          () => { }
        );

        expect(oneThirdAlgorithmService.error).toBeFalsy();
      }));

    });

    describe('initial tape with letter \"A\" as second square', () => {

      let deepCopy: DeepCopy;
      let initialTape: Tape;

      beforeEach(() => {
        deepCopy = new DeepCopy();
        initialTape = <Tape>deepCopy.apply(oneThirdAlgorithmService.getDefaultInitialTape());
        initialTape.squares[1].value = 'A';
      });

      it('should create 2 machine statuses', async(() => {
        const machineStatus: Array<MachineStatus> = [];
        oneThirdAlgorithmService.machineStatusObservable.subscribe(
          status => machineStatus.push(status),
          error => console.log(error),
          () => { }
        );

        oneThirdAlgorithmService.evolve(initialTape);

        expect(machineStatus.length).toBe(2);
      }));

      it('should create machine statuses', async(() => {
        const expectedSquareValues: Array<Array<string>> = [
          ['', 'A', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['0', 'A', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
        ];

        let tapeIndex = 0;
        oneThirdAlgorithmService.machineStatusObservable.subscribe(status => {
          for (let squareIndex = 0; squareIndex < status.tape.squares.length; squareIndex++) {
            expect(status.tape.squares[squareIndex].id).toBe(squareIndex + 1);
            expect(status.tape.squares[squareIndex].value).toBe(expectedSquareValues[tapeIndex][squareIndex]);
          }
          expect(status.index).toBe(tapeIndex);
          tapeIndex++;
        });

        oneThirdAlgorithmService.evolve(initialTape);
      }));

      it('should set completed as true on evolution error', async(() => {
        oneThirdAlgorithmService.evolve(initialTape);

        oneThirdAlgorithmService.machineStatusObservable.subscribe(
          status => { },
          error => console.log(error),
          () => { }
        );

        expect(oneThirdAlgorithmService.completed).toBeTruthy();
      }));

      it('should set error as true on evolution error', async(() => {
        oneThirdAlgorithmService.evolve(initialTape);

        oneThirdAlgorithmService.machineStatusObservable.subscribe(
          status => { },
          error => console.log(error),
          () => { }
        );

        expect(oneThirdAlgorithmService.error).toBeTruthy();
      }));

    });

  });

  describe('stop', () => {

    xit('should stop algorithm evolution', async(() => {
      const machineStatus: Array<MachineStatus> = [];
      oneThirdAlgorithmService.machineStatusObservable.subscribe(
        status => machineStatus.push(status),
        error => console.log(error),
        () => { }
      );
      oneThirdAlgorithmService.evolve(oneThirdAlgorithmService.getDefaultInitialTape());

      oneThirdAlgorithmService.stop();

      expect(machineStatus.length).toBeLessThan(20);
    }));

    xit('should set completed as true', async(() => {
      oneThirdAlgorithmService.machineStatusObservable.subscribe(
        status => { },
        error => console.log(error),
        () => { }
      );
      oneThirdAlgorithmService.evolve(oneThirdAlgorithmService.getDefaultInitialTape());

      oneThirdAlgorithmService.stop();

      expect(this.completed).toBeTruthy();
    }));

  });

});
