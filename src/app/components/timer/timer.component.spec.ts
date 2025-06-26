import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimerComponent]
    });
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    component.clearTimer();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should start timer on ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    expect(component.isRunning).toBeTrue();
    expect(component.timerId).not.toBeNull();

    tick(3000); 
    expect(component.time).toBe(3);

    component.ngOnDestroy();
  }));

  it('should pause timer and stop incrementing time', fakeAsync(() => {
    component.ngOnInit();
    tick(2000);
    component.pauseTimer();
    const timeAtPause = component.time;
    tick(3000);
    expect(component.time).toBe(timeAtPause);
    expect(component.isRunning).toBeFalse();

    component.ngOnDestroy();
  }));

  it('should toggle timer: start if paused and pause if running', fakeAsync(() => {
    component.ngOnInit();
    expect(component.isRunning).toBeTrue();

    component.toggleTimer();
    expect(component.isRunning).toBeFalse();

    component.toggleTimer();
    expect(component.isRunning).toBeTrue();

    component.ngOnDestroy();
  }));

  it('should format time correctly', () => {
    expect(component.formatTime(0)).toBe('00:00');
    expect(component.formatTime(65)).toBe('01:05');
    expect(component.formatTime(600)).toBe('10:00');
  });
});
