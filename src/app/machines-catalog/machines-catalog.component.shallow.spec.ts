import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { MachinesCatalogComponent } from './machines-catalog.component';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('MachinesCatalogComponent', () => {
  let component: MachinesCatalogComponent;
  let fixture: ComponentFixture<MachinesCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MachinesCatalogComponent],
      providers: [
        { provide: Router, useClass: RouterStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show the turing machine catalog', () => {
    const compiled = fixture.debugElement.nativeElement;
    const catalog = compiled.querySelectorAll('.catalog>li');
    expect(catalog == null).toBeFalsy();
    expect(catalog.length).toBe(1);
  });

  it('should open the one third turing machine', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    const compiled = fixture.debugElement.nativeElement;
    const catalog: Array<HTMLElement> = compiled.querySelectorAll('.catalog>li');

    catalog[0].click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/one-third');
  }));

});
