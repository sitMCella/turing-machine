import { Injectable } from '@angular/core';

@Injectable()
export class IntervalService {
    private interval: any;

    public setInterval(callback: () => void, time: number) {
        this.interval = setInterval(callback, time);
    }

    public clear(): void {
        if (this.interval) {
            clearTimeout(this.interval);
            clearInterval(this.interval);
        }
    }

}
