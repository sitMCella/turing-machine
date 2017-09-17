import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { OneThirdMachineComponent } from './one-third-machine.component';
import { TapeComponent } from '../tape/tape.component';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('OneThirdMachineComponent', () => {
  let component: OneThirdMachineComponent;
  let fixture: ComponentFixture<OneThirdMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OneThirdMachineComponent,
        TapeComponent
      ],
      providers: [
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneThirdMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show title', () => {
    const compiled = fixture.debugElement.nativeElement;
      const title: HTMLElement = compiled.querySelector('.title');
      expect(title == null).toBeFalsy();
      expect(title.innerHTML).toBe('One third Turing machine');
  });

  it('should show link to turing machines catalog', () => {
    const compiled = fixture.debugElement.nativeElement;
      const reference: HTMLElement = compiled.querySelector('.reference');
      expect(reference == null).toBeFalsy();
  });

  it('should open the turing machines catalog', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    const compiled = fixture.debugElement.nativeElement;
    const reference: HTMLElement = compiled.querySelector('.reference');

    reference.click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('');
  }));

  it('should show turing machine configuration', () => {
    const compiled = fixture.debugElement.nativeElement;
      const configuration: HTMLElement = compiled.querySelector('.configuration');
      expect(configuration == null).toBeFalsy();
  });

  it('should show at least one tape', () => {
    const compiled = fixture.debugElement.nativeElement;
      const tapes: Array<HTMLElement> = compiled.querySelectorAll('.tape');
      expect(tapes == null).toBeFalsy();
      expect(tapes.length).toBeGreaterThanOrEqual(1);
  });

});