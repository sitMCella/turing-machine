import { TestBed, inject } from '@angular/core/testing';

import { OneThirdAlgorithmService } from './one-third-algorithm.service';
import { MachineStatus } from '../machine-status';
import { Tape } from '../tape';
import { Square } from '../square';

describe('OneThirdAlgorithmService', () => {
  let oneThirdAlgorithmService: OneThirdAlgorithmService;

  beforeEach(() => {
    oneThirdAlgorithmService = new OneThirdAlgorithmService();
  });

  it('should have an initial machine status', () => {
    const firstMachineStatus: MachineStatus = oneThirdAlgorithmService.getFirstMachineStatus();

    for (let i = 0; i < firstMachineStatus.tape.squares.length; i++) {
      expect(firstMachineStatus.tape.squares[i].id).toBe(i + 1);
      expect(firstMachineStatus.tape.squares[i].value).toBe('');
    }
    expect(firstMachineStatus.index).toBe(0);
  });

  describe('evolve', () => {

    it('should create 20 machine status', () => {
      const machineStatus: Array<MachineStatus> = oneThirdAlgorithmService.evolve();

      expect(machineStatus.length).toBe(20);
    });

    it('should create machine status', () => {
      const machineStatus: Array<MachineStatus> = oneThirdAlgorithmService.evolve();

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

      for (let tapeIndex = 0; tapeIndex < machineStatus.length; tapeIndex++) {
        for (let squareIndex = 0; squareIndex < machineStatus[tapeIndex].tape.squares.length; squareIndex++) {
          expect(machineStatus[tapeIndex].tape.squares[squareIndex].id).toBe(squareIndex + 1);
          expect(machineStatus[tapeIndex].tape.squares[squareIndex].value).toBe(expectedSquareValues[tapeIndex][squareIndex]);
        }
        expect(machineStatus[tapeIndex].index).toBe(tapeIndex);
      }
    });

  });

});
