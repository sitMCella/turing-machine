import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TapeComponent } from './tape.component';
import { Tape } from '../tape';
import { MachineStatus } from '../machine-status';
import { OneThirdAlgorithmService } from '../one-third-machine/one-third-algorithm.service';

describe('TapeComponent', () => {
  let component: TapeComponent;
  let fixture: ComponentFixture<TapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TapeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapeComponent);
    component = fixture.componentInstance;
    component.algorithm = new OneThirdAlgorithmServiceStub();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain at least one tape', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.tape') == null).toBeFalsy();
    expect(compiled.querySelectorAll('.tape').length).toBeGreaterThanOrEqual(1);
  });


  class OneThirdAlgorithmServiceStub extends OneThirdAlgorithmService {
    constructor() {
      super();
    }

    public evolve(): void {
    }
  }

});
