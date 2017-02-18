import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private timer: NodeJS.Timer;
  private timerStarted: Boolean = false;
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          this.clearTimerAndAlertIfRunning();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.clearTimerAndAlertIfRunning();
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
    this.alertTimerStart(6000);
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.clearTimerAndAlertIfRunning();
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
    this.alertTimerStart(8000);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  private clearAlert() {
    this.subject.next();
  }

  private clearTimerAndAlertIfRunning() {
    if (this.timerStarted) {
      this.alertTimerClear();
      this.clearAlert();
    }
  }

  private alertTimerClear() {
    this.timerStarted = false;
    clearTimeout(this.timer);
  }

  private alertTimerStart(ms: number) {
    this.timerStarted = true;
    this.timer = setTimeout(() => {
      this.clearAlert()
    }, ms)
  }
}