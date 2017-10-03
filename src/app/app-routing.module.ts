import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MachinesCatalogComponent } from './machines-catalog/machines-catalog.component';
import { OneThirdMachineComponent } from './one-third-machine/one-third-machine.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: MachinesCatalogComponent
      },
      {
        path: 'one-third',
        component: OneThirdMachineComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
