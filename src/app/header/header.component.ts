import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { User, AuthService, AlertService } from '../shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
     
  isAdmin:any = this.authService.isAdmin$;
  isUniversity:any = this.authService.isUniversity$;  

  constructor(private authService: AuthService, private alertService: AlertService) {}

  ngAfterViewInit() {}

  // currentUser() {
  //   return this.authenticationService.currentUser();
  // }



  // logout() {
  //   let currentUser = this.currentUser();
  //    if (currentUser) {
  //     this.alertService.success('you have successfully logged out, see you soon, ' + currentUser + '!', true);
  //   }
  //   this.authenticationService.logout();
    
  // }

}
