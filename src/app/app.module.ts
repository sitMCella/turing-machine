import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TapeComponent } from './tape/tape.component';
import { MachinesCatalogComponent } from './machines-catalog/machines-catalog.component';
import { AlgorithmEvolutionService } from './algoritm-evolution.service';
import { OneThirdMachineComponent } from './one-third-machine/one-third-machine.component';
import { OneThirdAlgorithmService } from './one-third-machine/one-third-algorithm.service';
import { OneThirdAlgorithmSingleMConfigService } from './one-third-machine-single-m-config/one-third-algorithm-single-m-config.service';
import { OneThirdMachineSingleMConfigComponent } from './one-third-machine-single-m-config/one-third-machine-single-m-config.component';
import { IntervalService } from './interval.service';

@NgModule({
  declarations: [
    AppComponent,
    TapeComponent,
    MachinesCatalogComponent,
    OneThirdMachineComponent,
    OneThirdMachineSingleMConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AlgorithmEvolutionService,
    OneThirdAlgorithmService,
    OneThirdAlgorithmSingleMConfigService,
    IntervalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
