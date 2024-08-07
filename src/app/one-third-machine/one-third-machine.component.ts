import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { OneThirdAlgorithmService } from "./one-third-algorithm.service";

@Component({
  selector: "app-one-third-machine",
  templateUrl: "./one-third-machine.component.html",
  styleUrls: ["../machine-component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneThirdMachineComponent {
  constructor(
    public algorithm: OneThirdAlgorithmService,
    private router: Router,
  ) {}

  public navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
