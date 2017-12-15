import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IncreasingOnesAlgorithmService } from './increasing-ones-algorithm.service';

@Component({
  selector: 'app-increasing-ones-machine',
  templateUrl: './increasing-ones-machine.component.html',
  styleUrls: ['../machine-component.css']
})
export class IncreasingOnesMachineComponent {

  constructor(public algorithm: IncreasingOnesAlgorithmService, private router: Router) { }

  public navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }

}
