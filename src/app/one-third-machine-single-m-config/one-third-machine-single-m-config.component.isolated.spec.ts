import { ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { OneThirdMachineSingleMConfigComponent } from "./one-third-machine-single-m-config.component";
import { OneThirdAlgorithmSingleMConfigService } from "./one-third-algorithm-single-m-config.service";
import { AlgorithmEvolutionService } from "../algorithm-evolution.service";
import { IntervalService } from "../interval.service";
import { TimeServiceStub } from "../time-stub.service";

describe("OneThirdMachineSingleMConfigComponent", () => {
  class RouterStub {
    navigateByUrl(url: string) {
      return url;
    }
  }

  let component: OneThirdMachineSingleMConfigComponent;
  let fixture: ComponentFixture<OneThirdMachineSingleMConfigComponent>;

  beforeEach(() => {
    const intervalService: IntervalService = new IntervalService(
      new TimeServiceStub(),
    );
    TestBed.configureTestingModule({
      declarations: [OneThirdMachineSingleMConfigComponent],
      providers: [
        OneThirdAlgorithmSingleMConfigService,
        AlgorithmEvolutionService,
        { provide: IntervalService, useValue: intervalService },
        { provide: Router, useClass: RouterStub },
      ],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneThirdMachineSingleMConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("should show title", () => {
    const compiled: any = fixture.debugElement.nativeElement;
    const title: HTMLElement = compiled.querySelector(".title");
    expect(title).not.toBeNull();
    expect(title).toBeDefined();
    expect(title.innerHTML).toBe("One third Turing machine single m-config");
  });

  it("should show link to turing machines catalog", () => {
    const compiled: any = fixture.debugElement.nativeElement;
    const reference: HTMLElement = compiled.querySelector(".reference");
    expect(reference).not.toBeNull();
    expect(reference).toBeDefined();
  });

  it("should open the turing machines catalog", inject(
    [Router],
    (router: Router) => {
      jest.spyOn(router, "navigateByUrl");
      const compiled: any = fixture.debugElement.nativeElement;
      const reference: HTMLElement = compiled.querySelector(".reference");

      reference.click();

      expect(router.navigateByUrl).toHaveBeenCalledWith("");
    },
  ));

  it("should show turing machine configuration", () => {
    const compiled: any = fixture.debugElement.nativeElement;
    const configuration: HTMLElement = compiled.querySelector(".configuration");
    expect(configuration).not.toBeNull();
    expect(configuration).toBeDefined();
  });
});
