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

  it('should contains the default initial tape', () => {
    const compiled = fixture.debugElement.nativeElement;
    const initialTape: HTMLElement = compiled.querySelector('.initial-tape');
    expect(initialTape).not.toBeNull();
    expect(initialTape).not.toBeUndefined();
  });

  it('should contains the default initial tape with 20 squares', () => {
    const compiled = fixture.debugElement.nativeElement;
    const squares: Array<HTMLElement> = compiled.querySelectorAll('.initial-tape .square');
    expect(squares).not.toBeNull();
    expect(squares).not.toBeUndefined();
    expect(squares.length).toBe(20);
  });

  it('should contains the stop button', () => {
    const compiled = fixture.debugElement.nativeElement;
    const stopButton: HTMLButtonElement = compiled.querySelector('.stop');
    expect(stopButton).not.toBeNull();
    expect(stopButton).not.toBeUndefined();
  });

  it('should contains at least one tape', () => {
    const compiled = fixture.debugElement.nativeElement;
    const tapes: Array<HTMLElement> = compiled.querySelectorAll('.tape');
    expect(tapes == null).toBeFalsy();
    expect(tapes.length).toBeGreaterThanOrEqual(1);
  });

  describe('stop button', () => {

    it('should stop algorithm evolution', () => {
      const compiled: any = fixture.debugElement.nativeElement;
      const stopButton: HTMLButtonElement = compiled.querySelector('.stop');

      stopButton.click();

      const tapes: Array<HTMLElement> = compiled.querySelectorAll('.tape');
      expect(tapes == null).toBeFalsy();
      expect(tapes.length).toBeLessThanOrEqual(20);
    });

  });

  class OneThirdAlgorithmServiceStub extends OneThirdAlgorithmService {
    constructor() {
      super();
    }

    public evolve(): void {
    }
  }

});
