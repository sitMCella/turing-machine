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
      declarations: [ TapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapeComponent);
    component = fixture.componentInstance;
    component.algorithmService = new OneThirdAlgorithmService();
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

  describe('each tape', () => {

    it('should contain 20 squares', () => {
      const compiled: any = fixture.debugElement.nativeElement;
      const tapes: any = compiled.querySelectorAll('.tape');
      for (let i = 0; i < tapes.length; i++) {
        const squares: any = tapes[i].querySelectorAll('.square');
        expect(squares == null).toBeFalsy();
        expect(squares.length).toEqual(20);
      }
    });

  });

});
