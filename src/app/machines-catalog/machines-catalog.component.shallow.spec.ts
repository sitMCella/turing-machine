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

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MachinesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show the turing machine catalog', () => {
    const compiled = fixture.debugElement.nativeElement;
    const catalog = compiled.querySelectorAll('.catalog>li');
    expect(catalog).not.toBeNull();
    expect(catalog).toBeDefined();
    expect(catalog.length).toBe(2);
  });

  it('should open the one third turing machine', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    const compiled = fixture.debugElement.nativeElement;
    const catalog: Array<HTMLElement> = compiled.querySelectorAll('.catalog>li');

    catalog[0].click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/one-third');
  }));

  it('should open the one third turing machine single m-config', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    const compiled = fixture.debugElement.nativeElement;
    const catalog: Array<HTMLElement> = compiled.querySelectorAll('.catalog>li');

    catalog[1].click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/one-third-single-m-config');
  }));

});
