import { AuthenticationService } from '../shared';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() sideBarToggled = new EventEmitter();
  
  user: any;  
  sidebarState: boolean = true;

  constructor(private authService: AuthenticationService) {    
    authService.getUser$().subscribe(user => {      
      this.user = user
    });
  }

  toggleSideBar() {        
    this.sidebarState = !this.sidebarState;
    this.sideBarToggled.emit(this.sidebarState);
  }
  signOut() {
    this.authService.signOut();
  }     

  ngOnInit() {    
  }
}
