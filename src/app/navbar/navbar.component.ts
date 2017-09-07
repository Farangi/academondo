import { AuthenticationService } from '../shared';

import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  user: any;  

  constructor(private authService: AuthenticationService) {    
    authService.getUser$().subscribe(user => {      
      this.user = user
    });
  }

  signOut() {
    this.authService.signOut();
  }     

  ngOnInit() {    
  }
}
