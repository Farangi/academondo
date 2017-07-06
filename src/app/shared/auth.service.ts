import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  // isAuthenticated = false;
  // user: any = {};

  constructor( private af: AngularFireAuth) { }

  // private authStream: Observable<boolean> = new Subject();
  // public isAuth$() {
  //   return this.authStream;
  // }

  // private userStream: Observable<any>;
  // public getUser$() {
  //   return this.userStream;
  // }

  

  signOut() {
    this.af.auth.signOut();
  }





  // using firebase ui instead.
  // login(from: string) {
  //   this.af.auth
  //   .signInWithPopup(this.getAuthProvider(from))
  //   .then(
  //       (success) => {
  //       this.router.navigate(['/dashboard']);
  //     }).catch(
  //       (err) => {
  //       this.error = err;
  //     })
  // }

// private getAuthProvider(provider: string): firebase.auth.AuthProvider {
//     switch(provider){
//       case 'twitter': return new firebase.auth.TwitterAuthProvider();
//       case 'facebook': return new firebase.auth.FacebookAuthProvider();
//       case 'github': return new firebase.auth.GithubAuthProvider();
//       case 'google': return new firebase.auth.GoogleAuthProvider();
//     }
//   }

}
