import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { User, AuthenticationService, AlertService } from '../shared';
import { MistComponent } from '../mist/mist.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild(MistComponent)
  private mist: MistComponent;
     
    constructor(private authenticationService: AuthenticationService, private alertService: AlertService) {}

  ngAfterViewInit() {}

  currentUser() {
    return this.authenticationService.currentUser();
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  } 

  logout() {
    let currentUser = this.currentUser();
     if (currentUser) {
      this.alertService.success('you have successfully logged out, see you soon, ' + currentUser + '!', true);
    }
    this.authenticationService.logout();
    
  }
  easterEgg(msg:string) {    
    this.mist.enterTheAbyss(msg);
  }

}
