import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/switchMap';

import { User } from './models/user'

@Injectable()
export class AuthenticationService {
  private user$: Observable<User>;
  private userStream: Observable<any>;
  private adminStream: Observable<any>;  
  private universityStream: Observable<any>;

  userId: string;

  user: BehaviorSubject<User> = new BehaviorSubject(null); 


  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router,
              private afs: AngularFirestore) {

    this.user$ = this.afAuth.authState
      .switchMap(user => {
        if(user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else { return Observable.of(null)}
      })

    this.afAuth.authState
    .do(user => {
      if(user) {
        this.userId = user.uid;        
        this.createUserInFirebase(user);
      }})
      .subscribe();

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

    // this.adminStream = this.afAuth.authState
    // .switchMap((user:any) => {
    //   if (!user) {
    //     return Observable.of(false)
    //   } else {
    //     return this.db.object('/admin/' + user.uid).valueChanges()
    //   }  
    // })
    // .catch(() => Observable.throw('Unable to fetch admin state!'))

    // this.universityStream = this.afAuth.authState
    // .switchMap((user:any) => {
    //   if (!user) {
    //     return Observable.of(false)
    //   } else {
    //     return this.db.object('/university/' + user.uid).valueChanges()
    //   }  
    // })
    // .catch(() => Observable.throw('Unable to fetch university state!'))

  }

  getRoles = this.afAuth.authState
    .switchMap((user: any) => {
      if (!user) {
        return Observable.of(false)
      } else {
        return this.db.object('users/' + user.uid + '/roles').valueChanges()
      }
    })
    .catch(() => Observable.throw('Unable to fetch admin state!'))


  getUser$() {
    return this.userStream;
  }
  getUserId() {
    return this.userId;
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

  private createUserInFirebase(authData) {    
    const ref = this.db.object('users/' + authData.uid)
    const ref$: Observable<any> = ref.valueChanges()
    ref$.take(1)
      .subscribe(user => {
        if (!user.roles) {          
          const userData = new User(authData);
          ref.update(userData);
        }
      })
  }
}
