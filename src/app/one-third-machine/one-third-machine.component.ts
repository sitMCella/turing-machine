import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OneThirdAlgorithmService } from './one-third-algorithm.service';

@Component({
  selector: 'app-one-third-machine',
  templateUrl: './one-third-machine.component.html',
  styleUrls: ['./one-third-machine.component.css']
})
export class OneThirdMachineComponent implements OnInit {

  constructor(private router: Router) { }

  public algorithm: OneThirdAlgorithmService;

  ngOnInit() {
    this.algorithm = new OneThirdAlgorithmService();
  }

  public navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

}
