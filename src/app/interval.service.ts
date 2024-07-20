import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { TimeService } from "./time.service";

@Injectable()
export class IntervalService {
  constructor(private timeService: TimeService) {}

  public setInterval(time: number) {
    this.timeService.setInterval(time);
  }

  public subscribe(callback: () => void): Subscription {
    return this.timeService.getInterval().subscribe(() => callback());
  }

  public clear(): void {
    this.timeService.clear();
  }
}
