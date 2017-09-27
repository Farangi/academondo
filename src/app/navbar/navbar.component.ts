import { NavService } from './../shared/nav.service';
import { AuthenticationService } from '../shared';

import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  sidenavState: boolean;  
  user: any;    

  constructor(private authService: AuthenticationService, private navService: NavService) {    
    this.authService.getUser$().subscribe(user => {
      this.user = user
    });
    this.navService.sidenavState$
      .subscribe(state => this.sidenavState = state)
  }

  toggleSideBar() {    
    this.navService.toggleSidenav(!this.sidenavState)
  }
  signOut() {
    this.authService.signOut();
  }     

  ngOnInit() {    
  }
}
