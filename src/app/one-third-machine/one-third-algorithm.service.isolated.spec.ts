import { TestBed, inject, async } from '@angular/core/testing';

import { OneThirdAlgorithmService } from './one-third-algorithm.service';
import { MachineStatus } from '../machine-status';
import { Tape } from '../tape';
import { Square } from '../square';

describe('OneThirdAlgorithmService', () => {
  let oneThirdAlgorithmService: OneThirdAlgorithmService;

  beforeEach(() => {
    oneThirdAlgorithmService = new OneThirdAlgorithmService();
  });

  it('should have an initial machine status', async(() => {
    oneThirdAlgorithmService.machineStatusObservable.subscribe(status => {
      for (let i = 0; i < status.tape.squares.length; i++) {
        expect(status.tape.squares[i].id).toBe(i + 1);
        expect(status.tape.squares[i].value).toBe('');
      }
      expect(status.index).toBe(0);
    });
  }));

  describe('evolve', () => {

    const machineStatus: Array<MachineStatus> = [];

    it('should create 20 machine status', async(() => {
      oneThirdAlgorithmService.evolve();

      oneThirdAlgorithmService.machineStatusObservable.subscribe(
        status => machineStatus.push(status),
        error => console.log(error),
        () => expect(machineStatus.length).toBe(20));
    }));

    it('should create machine status', async(() => {
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

      oneThirdAlgorithmService.evolve();
    }));

  });

});
