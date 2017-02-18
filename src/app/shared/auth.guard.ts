import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service'
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router, private authenticationService: AuthenticationService) { }
 
    canActivate() {
      let result = this.authenticationService.authenticate();
      if (result === false) {
        return result; 

      } else {
        return result
      .map((auth) => {
        if (auth) {
        return true;
      }      
      this.router.navigate(['/login']);
      return false;
      })
      }             
    }
}