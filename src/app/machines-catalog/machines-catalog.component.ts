import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-machines-catalog",
  templateUrl: "./machines-catalog.component.html",
  styleUrls: ["./machines-catalog.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MachinesCatalogComponent {
  constructor(private router: Router) {}

  public navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }
}
