import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OneThirdMachineSingleMConfigComponent } from './one-third-machine-single-m-config.component';
import { OneThirdAlgorithmSingleMConfigService } from './one-third-algorithm-single-m-config.service';
import { AlgorithmEvolutionService } from '../algorithm-evolution.service';
import { TapeComponent } from '../tape/tape.component';
import { IntervalService } from '../interval.service';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('OneThirdMachineSingleMConfigComponent', () => {
  let component: OneThirdMachineSingleMConfigComponent;
  let fixture: ComponentFixture<OneThirdMachineSingleMConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OneThirdMachineSingleMConfigComponent,
        TapeComponent
      ],
      providers: [
        OneThirdAlgorithmSingleMConfigService,
        AlgorithmEvolutionService,
        IntervalService,
        { provide: Router, useClass: RouterStub }
      ],
      imports: [FormsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneThirdMachineSingleMConfigComponent);
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
    }, 1100);
  }));

  it('should show 11 tapes', async(() => {
    const compiled: any = fixture.debugElement.nativeElement;

    setTimeout(() => {
      fixture.detectChanges();

      const tapes: Array<HTMLElement> = compiled.querySelectorAll('.tape');
      expect(tapes).not.toBeNull();
      expect(tapes).toBeDefined();
      expect(tapes.length).toEqual(11);
    }, 1100);
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
      }, 1100);
    }));

  });

});
