import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MachinesCatalogComponent } from "./machines-catalog/machines-catalog.component";
import { OneThirdMachineComponent } from "./one-third-machine/one-third-machine.component";
import { OneThirdMachineSingleMConfigComponent } from "./one-third-machine-single-m-config/one-third-machine-single-m-config.component";
import { IncreasingOnesMachineComponent } from "./increasing-ones-machine/increasing-ones-machine.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: "",
        component: MachinesCatalogComponent,
      },
      {
        path: "one-third",
        component: OneThirdMachineComponent,
      },
      {
        path: "one-third-single-m-config",
        component: OneThirdMachineSingleMConfigComponent,
      },
      {
        path: "increasing-ones",
        component: IncreasingOnesMachineComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
