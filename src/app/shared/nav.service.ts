import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class NavService {

  sidenavState$: BehaviorSubject<boolean>;
  pinState$: BehaviorSubject<boolean>;
  pinState: boolean;
  constructor() {
    this.sidenavState$ = new BehaviorSubject(true);
    this.pinState$ = new BehaviorSubject(true);

    this.pinState$
    .subscribe(state => {
      this.pinState = state;
    })
   }

  toggleSidenav(newstate) {
    if (this.pinState) { return }
    this.sidenavState$.next(newstate);    
  }

  togglePinned(newState) {
    this.pinState$.next(newState);
  }
  

}
