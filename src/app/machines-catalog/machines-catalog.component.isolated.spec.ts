import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MachinesCatalogComponent } from './machines-catalog.component';

describe('MachinesCatalogComponent', () => {
  let component: MachinesCatalogComponent;
  let fixture: ComponentFixture<MachinesCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachinesCatalogComponent],
      providers: [
        { provide: Router, useClass: RouterStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show the turing machines catalog', () => {
    const compiled: any = fixture.debugElement.nativeElement;
    const catalog: Array<HTMLElement> = compiled.querySelectorAll('.catalog>li');
    expect(catalog).not.toBeNull();
    expect(catalog).toBeDefined();
    expect(catalog.length).toBe(3);
    expect(catalog[0].innerHTML).toBe('One third Turing machine');
    expect(catalog[1].innerHTML).toBe('One third Turing machine single m-config');
    expect(catalog[2].innerHTML).toBe('Increasing Ones Turing machine');
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

  it('should open the increasing ones turing machine', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    const compiled = fixture.debugElement.nativeElement;
    const catalog: Array<HTMLElement> = compiled.querySelectorAll('.catalog>li');

    catalog[2].click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/increasing-ones');
  }));

});

class RouterStub {
  navigateByUrl(url: string) { return url; }
}
