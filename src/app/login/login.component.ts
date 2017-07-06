import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AlertService, AuthenticationService, AuthService } from '../shared';

import { routerTransition } from 'router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class LoginComponent implements OnInit {


  isAuthenticated = false;  
  user: any = {};
  error: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private authService: AuthService,
    private af: AngularFireAuth) {
      this.af.authState.subscribe(user => this.userState(user),
      error => console.trace(error)
      );
      
     }

  ngOnInit() {
  }
// using firebase ui instead.
  // login(from: string) {
  //   this.af.auth
  //   .signInWithPopup(this.getAuthProvider(from))
  //   .then(res => console.log(res))
  // }

  signOut() {
    this.af.auth.signOut();
  }

  private userState(user: any = null) {
    if(user) {
      this.isAuthenticated = true;      
      this.user = this.getUserInfo(user);
    }
    else {
      this.isAuthenticated = false;      
      this.user = {};
    }
  }

  private getUserInfo(user: any): any {
    if(!user) {
      return {};
    }
    let data = user.providerData[0];
    console.log(data);
    return {
      name: data.displayName,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId
    };
  }

// private getAuthProvider(provider: string): firebase.auth.AuthProvider {
//     switch(provider){
//       case 'twitter': return new firebase.auth.TwitterAuthProvider();
//       case 'facebook': return new firebase.auth.FacebookAuthProvider();
//       case 'github': return new firebase.auth.GithubAuthProvider();
//       case 'google': return new firebase.auth.GoogleAuthProvider();
//     }
//   }
}