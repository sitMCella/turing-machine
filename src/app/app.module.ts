import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TapeComponent } from './tape/tape.component';
import { MachinesCatalogComponent } from './machines-catalog/machines-catalog.component';
import { OneThirdMachineComponent } from './one-third-machine/one-third-machine.component';

@NgModule({
  declarations: [
    AppComponent,
    TapeComponent,
    MachinesCatalogComponent,
    OneThirdMachineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
