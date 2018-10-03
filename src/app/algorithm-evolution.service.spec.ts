import { fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { AlgorithmEvolutionService } from './algorithm-evolution.service';
import { Configuration } from './configuration';
import { MachineStatus } from './machine-status';
import { Tape } from './tape';
import { Square } from './square';
import { TapeSymbol } from './tape-symbol';
import { PrintOneOperation } from './operations/print-one-operation';
import { MoveRightOperation } from './operations/move-right-operation';
import { PrintZeroOperation } from './operations/print-zero-operation';

describe('AlgorithmEvolutionService', () => {

  let algorithmEvolutionService: AlgorithmEvolutionService;
  let configurations: Array<Configuration>;
  let initialTape: Tape;

  beforeEach(() => {
    algorithmEvolutionService = new AlgorithmEvolutionService();

    const firstConfiguration = new Configuration('b', new TapeSymbol(TapeSymbol.NONE),
      [new PrintZeroOperation(), new MoveRightOperation()], 'c');
    const secondConfiguration = new Configuration('c', new TapeSymbol(TapeSymbol.NONE),
      [new MoveRightOperation()], 'e');
    const thirdConfiguration = new Configuration('e', new TapeSymbol(TapeSymbol.NONE),
      [new PrintOneOperation(), new MoveRightOperation()], 'f');
    const fourthConfiguration = new Configuration('f', new TapeSymbol(TapeSymbol.NONE),
      [new MoveRightOperation()], 'b');
    configurations = [firstConfiguration, secondConfiguration, thirdConfiguration, fourthConfiguration];

    const squares: Array<Square> = [];
    for (let i = 0; i < 10; i++) {
      squares[i] = new Square(i + 1, new TapeSymbol(TapeSymbol.NONE));
    }
    initialTape = new Tape(squares);
  });

  it('should initially have completed as false', () => {
    expect(algorithmEvolutionService.completed).toBeFalsy();
  });

  it('should initially have error as false', () => {
    expect(algorithmEvolutionService.error).toBeFalsy();
  });

  describe('evolve', () => {

    it('should create 11 machine statuses', fakeAsync(() => {
      const machineStatus: Array<MachineStatus> = [];
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
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
        ['', '', '', '', '', '', '', '', '', ''],
        ['0', '', '', '', '', '', '', '', '', ''],
        ['0', '', '', '', '', '', '', '', '', ''],
        ['0', '', '1', '', '', '', '', '', '', ''],
        ['0', '', '1', '', '', '', '', '', '', ''],
        ['0', '', '1', '', '0', '', '', '', '', ''],
        ['0', '', '1', '', '0', '', '', '', '', ''],
        ['0', '', '1', '', '0', '', '1', '', '', ''],
        ['0', '', '1', '', '0', '', '1', '', '', ''],
        ['0', '', '1', '', '0', '', '1', '', '0', ''],
        ['0', '', '1', '', '0', '', '1', '', '0', '']
      ];
      const machineStatus: Array<MachineStatus> = [];

      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => {
          for (let tapeIndex = 0; tapeIndex < 11; tapeIndex++) {
            expect(machineStatus[tapeIndex].tape.squares.length).toEqual(10);
            for (let squareIndex = 0; squareIndex < 10; squareIndex++) {
              expect(machineStatus[tapeIndex].tape.squares[squareIndex].id).toBe(squareIndex + 1);
              expect(machineStatus[tapeIndex].tape.squares[squareIndex].symbol.value).toBe(expectedSquareValues[tapeIndex][squareIndex]);
            }
            expect(machineStatus[tapeIndex].index).toBe(tapeIndex);
          }
        }
      );
      tick(1100);
      discardPeriodicTasks();
    }));

    it('should set completed as true on evolution error', fakeAsync(() => {
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        status => { },
        error => new Error(error),
        () => { }
      );
      tick(1100);
      discardPeriodicTasks();

      expect(algorithmEvolutionService.completed).toBeTruthy();
    }));

    it('should set error as true on evolution error', fakeAsync(() => {
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        status => { },
        error => new Error(error),
        () => { }
      );
      tick(1100);
      discardPeriodicTasks();

      expect(algorithmEvolutionService.error).toBeTruthy();
    }));

  });

  describe('stop', () => {

    it('should stop algorithm evolution', fakeAsync(() => {
      const machineStatus: Array<MachineStatus> = [];
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => { }
      );
      tick(500);
      discardPeriodicTasks();

      algorithmEvolutionService.stop();

      expect(machineStatus.length).toBeLessThan(11);
    }));

    it('should set completed as true', fakeAsync(() => {
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        status => { },
        error => new Error(error),
        () => { }
      );
      tick(500);
      discardPeriodicTasks();

      algorithmEvolutionService.stop();

      expect(algorithmEvolutionService.completed).toBeTruthy();
    }));

    it('should set error as false', fakeAsync(() => {
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        status => { },
        error => new Error(error),
        () => { }
      );
      tick(500);
      discardPeriodicTasks();

      algorithmEvolutionService.stop();

      expect(algorithmEvolutionService.error).toBeFalsy();
    }));

  });

  describe('pause', () => {

    it('should stop algorithm evolution', fakeAsync(() => {
      const machineStatus: Array<MachineStatus> = [];
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => { }
      );
      tick(500);
      discardPeriodicTasks();

      algorithmEvolutionService.pause();

      expect(machineStatus.length).toBeLessThan(11);
    }));

  });

  describe('resume', () => {

    it('should resume algorithm evolution', fakeAsync(() => {
      const machineStatus: Array<MachineStatus> = [];
      algorithmEvolutionService.evolve(configurations, initialTape).subscribe(
        status => machineStatus.push(status),
        error => new Error(error),
        () => { }
      );
      tick(500);
      discardPeriodicTasks();
      algorithmEvolutionService.pause();
      tick(1000);
      discardPeriodicTasks();

      algorithmEvolutionService.resume();
      tick(600);
      discardPeriodicTasks();

      expect(machineStatus.length).toEqual(11);
    }));

  });

});
