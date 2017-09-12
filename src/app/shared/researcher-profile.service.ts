import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResearcherProfileService {
  private uid: string;
  private entity;
  private firebaseList;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {    
    this.uid = this.authService.getCurrentUserUid();
    this.firebaseList = this.db.list('/profiles');
  }

  getOwnProfile() {
    return this.db.list('/profiles', {
      query: {
        orderByChild: 'uid',
        equalTo: this.uid,
      }
    })    
    .map((entities) => {
      let [entity] = entities;
      this.entity = entity;
      return entity;
    })
    //.do(data => console.log('server data:', data))  // debug - fixme why do i get so many responses?
  }

  // getOwnProfile() {
  //   const uid = this.uid;
  //   // return this.db.object('/profiles/uid/' + uid);    
  //   // return this.db.object(`/profiles/uid/${this.uid}`);    
  // }

  private create(data) {    
    data.uid = this.uid;
    this.firebaseList.push(data);    
  }

  private update(key, data) {
    this.firebaseList.update(key, data);
  }

  public upsert(data) {
    if (this.entity) {
      this.update(this.entity.$key, data);
    } else {
      this.create(data);
    }
  }
}
