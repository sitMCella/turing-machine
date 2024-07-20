import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { OneThirdMachineComponent } from "./one-third-machine.component";
import { OneThirdAlgorithmService } from "./one-third-algorithm.service";
import { AlgorithmEvolutionService } from "../algorithm-evolution.service";
import { TapeComponent } from "../tape/tape.component";
import { IntervalService } from "../interval.service";
import { TimeServiceStub } from "../time-stub.service";

describe("OneThirdMachineComponent", () => {
  class RouterStub {
    navigateByUrl(url: string) {
      return url;
    }
  }

  let timeService: TimeServiceStub;
  let fixture: ComponentFixture<OneThirdMachineComponent>;

  beforeEach(async(() => {
    timeService = new TimeServiceStub();
    const intervalService: IntervalService = new IntervalService(timeService);
    TestBed.configureTestingModule({
      declarations: [OneThirdMachineComponent, TapeComponent],
      providers: [
        OneThirdAlgorithmService,
        AlgorithmEvolutionService,
        { provide: IntervalService, useValue: intervalService },
        { provide: Router, useClass: RouterStub },
      ],
      imports: [FormsModule],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OneThirdMachineComponent);
  }));

  it("should show at least one tape", async(() => {
    const compiled: any = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    timeService.tick(21);
    fixture.detectChanges();

    const tapes: Array<HTMLElement> = compiled.querySelectorAll(
      ".complete-configuration",
    );
    expect(tapes).not.toBeNull();
    expect(tapes).toBeDefined();
    expect(tapes.length).toBeGreaterThanOrEqual(1);
  }));

  it("should show 21 tapes", async(() => {
    const compiled: any = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    timeService.tick(21);
    fixture.detectChanges();

    const tapes: Array<HTMLElement> = compiled.querySelectorAll(
      ".complete-configuration",
    );
    expect(tapes).not.toBeNull();
    expect(tapes).toBeDefined();
    expect(tapes.length).toEqual(21);
  }));

  describe("each tape", () => {
    it("should contain 20 squares", async(() => {
      const compiled: any = fixture.debugElement.nativeElement;
      fixture.detectChanges();

      timeService.tick(21);
      fixture.detectChanges();

      const tapes: Array<HTMLElement> = compiled.querySelectorAll(
        ".complete-configuration",
      );
      for (let i = 0; i < tapes.length; i++) {
        const squares: any = tapes[i].querySelectorAll(".square");
        expect(squares).not.toBeNull();
        expect(squares).toBeDefined();
        expect(squares.length).toEqual(20);
      }
    }));
  });
});
