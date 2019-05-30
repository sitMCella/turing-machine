import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable()
export class TimeService {
  private interval: any;

  public getInterval() {
    return this.interval;
  }

  public setInterval(time: number) {
    this.interval = interval(time);
  }

  public clear(): void {
    if (this.interval) {
      clearTimeout(this.interval);
      clearInterval(this.interval);
    }
  }

}
