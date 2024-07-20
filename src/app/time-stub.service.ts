import { Injectable } from "@angular/core";
import { TimeService } from "./time.service";
import { Subject, Observable } from "rxjs";

@Injectable()
export class TimeServiceStub extends TimeService {
  private timeSubject: Subject<number>;
  private timeObservable: Observable<number>;

  constructor() {
    super();
  }

  public getInterval() {
    return this.timeObservable;
  }

  public setInterval(time: number) {
    this.timeSubject = new Subject();
    this.timeObservable = this.timeSubject.asObservable();
  }

  public clear(): void {
    if (this.timeSubject) {
      this.timeSubject.unsubscribe();
    }
  }

  public tick(times: number) {
    for (let i = 0; i < times; i++) {
      this.timeSubject.next(i);
    }
  }
}
