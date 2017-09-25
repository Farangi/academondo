import { AuthenticationService } from './../shared/authentication.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AlertService } from '../shared';
import { User } from "../shared/models";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
     
  isAdmin: any = this.authenticationService.isAdmin$;
  isUniversity: any = this.authenticationService.isUniversity$;  

  constructor(private authenticationService: AuthenticationService, private alertService: AlertService) {}

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
