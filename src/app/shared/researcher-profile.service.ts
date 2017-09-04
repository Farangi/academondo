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
  profile
  uid: string;
  private profileRef: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    // this.getOrCreateProfile()
    this.uid = this.authService.getCurrentUserUid();
    this.profileRef = this.db.list('/profiles', { 
      query: {
        orderByChild: 'uid',
        equalTo: this.uid
      }
    });
   }

   private tryCreateProfile(uid, profileData) {
    // this.profileRef.
   }

   private createProfile(uid): FirebaseObjectObservable<any> {
     const profileDefault = new ResearcherProfile(uid);
     const profileKey = this.db.list('/profiles').push(profileDefault);
     return this.db.object('/profile/' + profileKey);
   }

   private profileExists(uid:string): boolean {
    let res
    const profileRef = this.db.list('/profiles', { 
      query: {
        orderByChild: 'uid',
        equalTo: uid
      }
    });

    profileRef.take(1).subscribe(
      (profiles: ResearcherProfile[]) => {        
        if (profiles.length === 0) {
          res = false
        }
        res = true

      }
    );
    return res;    
  }
    private findProfileById(uid:string): Observable<ResearcherProfile> {
        return this.db.list('/profiles', { 
          query: {
            orderByChild: 'uid',
            equalTo: uid
          }
        })
        .map((profiles) => {
          this.profile = profiles[0] // fixme          
          return this.profile
        });
    }   

  getOwnProfile(): Observable<ResearcherProfile> {
    let uid: string = this.authService.getCurrentUserUid();
    // let fakeuid: string = 'this.authService.getCurrentUserUid()';
    return this.findProfileById(uid);
  }   

  updateProfile(data: any) {    
    this.profileRef.update(this.profile, data);
  }

}
