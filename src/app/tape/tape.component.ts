import { Component, OnInit, Input } from '@angular/core';
import { OneThirdAlgorithmService } from '../one-third-machine/one-third-algorithm.service';
import { MachineStatus } from '../machine-status';
import { Tape } from '../tape';
import { Square } from '../square';
import { DeepCopy } from '../deep-copy';

@Component({
  selector: 'app-tape',
  templateUrl: './tape.component.html',
  styleUrls: ['./tape.component.css']
})
export class TapeComponent implements OnInit {

  @Input()
  public algorithm: OneThirdAlgorithmService;

  public initialTape: Tape;
  public machineStatus: Array<MachineStatus> = [];

  private anyErrors = false;
  private finished = false;

  ngOnInit() {
    const deepCopy: DeepCopy = new DeepCopy();
    this.initialTape = <Tape>deepCopy.apply(this.algorithm.getDefaultInitialTape());
    const subscription = this.algorithm.machineStatusObservable.subscribe(
      value => this.machineStatus.push(<MachineStatus>value),
      error => this.anyErrors = true,
      () => this.finished = true
    );
    this.algorithm.evolve();
  }

  public stop(): void {
    this.algorithm.stop();
  }

}
