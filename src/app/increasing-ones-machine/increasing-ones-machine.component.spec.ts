import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IncreasingOnesMachineComponent } from './increasing-ones-machine.component';
import { IncreasingOnesAlgorithmService } from './increasing-ones-algorithm.service';
import { AlgorithmEvolutionService } from '../algorithm-evolution.service';

describe('IncreasingOnesMachineComponent', () => {

  class RouterStub {
    navigateByUrl(url: string) { return url; }
  }

  let component: IncreasingOnesMachineComponent;
  let fixture: ComponentFixture<IncreasingOnesMachineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        IncreasingOnesMachineComponent
      ],
      providers: [
        IncreasingOnesAlgorithmService,
        AlgorithmEvolutionService,
        { provide: Router, useClass: RouterStub }
      ],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreasingOnesMachineComponent);
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
    expect(title).toBeDefined();
    expect(title.innerHTML).toBe('Increasing Ones Turing machine');
  });

  it('should show link to turing machines catalog', () => {
    const compiled: any = fixture.debugElement.nativeElement;
    const reference: HTMLElement = compiled.querySelector('.reference');
    expect(reference).not.toBeNull();
    expect(reference).toBeDefined();
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
    expect(configuration).toBeDefined();
  });

});
