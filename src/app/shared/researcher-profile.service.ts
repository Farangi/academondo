import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs/Observable';

export class ResearcherProfile {
  private uid:string;

  constructor(uid:string) {
    this.uid = uid
  }
}

@Injectable()
export class ResearcherProfileService {
  private uid: string;
  private profile;
  private profiles;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {    
    this.uid = this.authService.getCurrentUserUid();
    this.profiles = this.db.list('/profiles');
  }

  private findProfileByUid(uid:string)  {
    return this.db.list('/profiles', {
      query: {
        orderByChild: 'uid',
        equalTo: uid,
        limitToFirst: 1
      }
    })
      .map((profiles) => {
        let [profile] = profiles;
        this.profile = profile;          
        return profile;
      });
  }

  getOwnProfile() {
    return this.findProfileByUid(this.uid);
  }

  private createProfile(profile) {    
    profile.uid = this.uid;
    this.profiles.push(profile);    
  }

  private updateProfile(key, profile) {
    this.profiles.update(key, profile);
  }

  public upsert(profile) {
    let key;
    if(this.profile) {
      key = this.profile.$key;
    }

    if (key) {
      this.updateProfile(key, profile);
    } else {
      this.createProfile(profile);
    }
  }
}
