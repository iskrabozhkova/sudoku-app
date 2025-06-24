import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  time = 0;
  timerId: any = null;
  isRunning = false;

  ngOnInit() {
    this.startTimer(); 
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  startTimer() {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        this.time++;
      }, 1000);
      this.isRunning = true;
    }
  }

  pauseTimer() {
    this.clearTimer();
    this.isRunning = false;
  }

  clearTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  toggleTimer() {
    if (this.isRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  resetTimer() {
    this.pauseTimer();
    this.time = 0;
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }
}