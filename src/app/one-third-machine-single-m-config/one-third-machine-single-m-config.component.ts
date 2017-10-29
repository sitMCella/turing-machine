import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OneThirdAlgorithmSingleMConfigService } from './one-third-algorithm-single-m-config.service';

@Component({
  selector: 'app-one-third-machine-single-m-config',
  templateUrl: './one-third-machine-single-m-config.component.html',
  styleUrls: ['../machine-component.css']
})
export class OneThirdMachineSingleMConfigComponent {

  constructor(public algorithm: OneThirdAlgorithmSingleMConfigService, private router: Router) { }

  public navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }

}
