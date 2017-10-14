import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
      ],
      imports: [FormsModule]
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
    const compiled: any = fixture.debugElement.nativeElement;
    const title: HTMLElement = compiled.querySelector('.title');
    expect(title).not.toBeNull();
    expect(title).not.toBeUndefined();
    expect(title.innerHTML).toBe('One third Turing machine');
  });

  it('should show link to turing machines catalog', () => {
    const compiled: any = fixture.debugElement.nativeElement;
    const reference: HTMLElement = compiled.querySelector('.reference');
    expect(reference).not.toBeNull();
    expect(reference).not.toBeUndefined();
  });

  it('should open the turing machines catalog', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    const compiled: any = fixture.debugElement.nativeElement;
    const reference: HTMLElement = compiled.querySelector('.reference');

    reference.click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('');
  }));

  it('should show turing machine configuration', () => {
    const compiled: any = fixture.debugElement.nativeElement;
    const configuration: HTMLElement = compiled.querySelector('.configuration');
    expect(configuration).not.toBeNull();
    expect(configuration).not.toBeUndefined();
  });

  it('should show at least one tape', () => {
    const compiled: any = fixture.debugElement.nativeElement;
    const tapes: Array<HTMLElement> = compiled.querySelectorAll('.tape');
    expect(tapes).not.toBeNull();
    expect(tapes).not.toBeUndefined();
    expect(tapes.length).toBeGreaterThanOrEqual(1);
  });

  describe('each tape', () => {

    it('should contain 20 squares', () => {
      const compiled: any = fixture.debugElement.nativeElement;
      const tapes: Array<HTMLElement> = compiled.querySelectorAll('.tape');
      for (let i = 0; i < tapes.length; i++) {
        const squares: any = tapes[i].querySelectorAll('.square');
        expect(squares).not.toBeNull();
        expect(squares).not.toBeUndefined();
        expect(squares.length).toEqual(20);
      }
    });

  });

});
