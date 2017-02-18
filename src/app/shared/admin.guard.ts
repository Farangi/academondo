import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service'

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate() {
    let result = this.authenticationService.isAdmin();
    if (result === false) {
      return result;

    } else {
      return result
        .map((auth) => {
          if (auth) {
            // console.log(auth.msg);
            return auth.success;
          }          
          return false;
        })
    }
  }
}