import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router, private authService : AngularFireAuth) { }
 
    canActivate(): Observable<boolean> {
      return Observable.from(this.authService.authState)
        .take(1)
        .map(state => !!state)
        .do(authenticated => {
      if 
        (!authenticated) this.router.navigate(['/login']);
      })
    }
}