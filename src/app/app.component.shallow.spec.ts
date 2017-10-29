import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MachinesCatalogComponent } from './machines-catalog/machines-catalog.component';
import { OneThirdMachineComponent } from './one-third-machine/one-third-machine.component';
import { OneThirdMachineSingleMConfigComponent } from './one-third-machine-single-m-config/one-third-machine-single-m-config.component';
import { TapeComponent } from './tape/tape.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MachinesCatalogComponent,
        OneThirdMachineComponent,
        OneThirdMachineSingleMConfigComponent,
        TapeComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
      imports: [
        AppRoutingModule,
        FormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should show the turing machines catalog', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    const catalog = compiled.querySelectorAll('.catalog');
    expect(catalog).not.toBeNull();
    expect(catalog).toBeDefined();
  }));

});
