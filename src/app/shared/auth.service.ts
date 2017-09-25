import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  isAuthenticated = false;
  private user: any = {};

  constructor( private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
     this.afAuth.authState.subscribe(
      user => this.userState(user),
      error => console.trace(error)
    );
   }

  // private authStream: Observable<boolean> = new Subject();
  // public isAuth$() {
  //   return this.authStream;
  // }

  // private userStream: Observable<any>;
  // public getUser$() {
  //   return this.userStream;
  // }

  //   isAuth$ = this.afAuth.authState.switchMap(state => {
  //   if (!state) {
  //     return Observable.of(false)
  //   } else {
  //     return this.db.object('/admin/' + state.uid)
  //   }
  // })

  // isAdmin$ = this.afAuth.authState
  // .switchMap(state => {
  //   if (!state) {
  //     return Observable.of(false)
  //   } else {     
  //     return this.db.object('/admin/' + state.uid)
  //   }
  // })

  // isUniversity$ = this.afAuth.authState.switchMap(state => {
  //   if (!state) {
  //     return Observable.of(false)
  //   } else {
  //     return this.db.object('/university/' + state.uid)
  //   }
  // })    

  signOut() {
    this.afAuth.auth.signOut();
  }

  getCurrentUserUid(){
    return this.user.uid;
  }

  // currentUser$ = this.afAuth.authState.map((state) => {
  //   return state;
  // })


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
    return {
      name: data.displayName,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId,
      uid: user.uid
    };
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
