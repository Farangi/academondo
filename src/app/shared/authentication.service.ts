import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class AuthenticationService {
  private userStream: Observable<any>;
  private adminStream: Observable<any>;
  private universityStream: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { 
    this.userStream = this.afAuth.authState
    .map((user) => {      
      if (!user) {
        return Observable.of(false)
      } else {
        let [first] = user.providerData;
        return {
          name: first.displayName,
          avatar: first.photoURL,
          email: first.email,
          provider: first.providerId,
          uid: user.uid
        };

      }  
    })
    .catch(() => Observable.throw('Unable to fetch user!'))

    this.adminStream = this.afAuth.authState
    .switchMap((user:any) => {
      if (!user) {
        return Observable.of(false)
      } else {
        return this.db.object('/admin/' + user.uid)
      }  
    })
    .catch(() => Observable.throw('Unable to fetch admin state!'))

    this.universityStream = this.afAuth.authState
    .switchMap((user:any) => {
      if (!user) {
        return Observable.of(false)
      } else {
        return this.db.object('/university/' + user.uid)
      }  
    })
    .catch(() => Observable.throw('Unable to fetch university state!'))

  }

  getUser$() {
    return this.userStream;
  }

  isAdmin$() {
    return this.adminStream;
  }

  isUniversity$() {
    return this.universityStream;
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
