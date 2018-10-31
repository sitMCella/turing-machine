import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OneThirdMachineComponent } from './one-third-machine.component';
import { OneThirdAlgorithmService } from './one-third-algorithm.service';
import { AlgorithmEvolutionService } from '../algorithm-evolution.service';
import { TapeComponent } from '../tape/tape.component';
import { IntervalService } from '../interval.service';

describe('OneThirdMachineComponent', () => {

  class RouterStub {
    navigateByUrl(url: string) { return url; }
  }

  let component: OneThirdMachineComponent;
  let fixture: ComponentFixture<OneThirdMachineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OneThirdMachineComponent,
        TapeComponent
      ],
      providers: [
        OneThirdAlgorithmService,
        AlgorithmEvolutionService,
        IntervalService,
        { provide: Router, useClass: RouterStub }
      ],
      imports: [FormsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneThirdMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show at least one tape', async(() => {
    const compiled: any = fixture.debugElement.nativeElement;

    setTimeout(() => {
      fixture.detectChanges();

      const tapes: Array<HTMLElement> = compiled.querySelectorAll('.tape');
      expect(tapes).not.toBeNull();
      expect(tapes).toBeDefined();
      expect(tapes.length).toBeGreaterThanOrEqual(1);
    }, 2100);
  }));

  it('should show 21 tapes', async(() => {
    const compiled: any = fixture.debugElement.nativeElement;

    setTimeout(() => {
      fixture.detectChanges();

      const tapes: Array<HTMLElement> = compiled.querySelectorAll('.tape');
      expect(tapes).not.toBeNull();
      expect(tapes).toBeDefined();
      expect(tapes.length).toEqual(21);
    }, 2100);
  }));

  describe('each tape', () => {

    it('should contain 20 squares', async(() => {
      const compiled: any = fixture.debugElement.nativeElement;

      setTimeout(() => {
        fixture.detectChanges();
        const tapes: Array<HTMLElement> = compiled.querySelectorAll('.tape');
        for (let i = 0; i < tapes.length; i++) {
          const squares: any = tapes[i].querySelectorAll('.square');
          expect(squares).not.toBeNull();
          expect(squares).toBeDefined();
          expect(squares.length).toEqual(20);
        }
      }, 2100);
    }));

  });

});
