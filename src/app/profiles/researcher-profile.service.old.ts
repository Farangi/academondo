// import { Injectable } from '@angular/core';
// import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
// import { AuthService } from "./auth.service";
// import { Observable } from 'rxjs/Observable';

// @Injectable()
// export class ResearcherProfileServiceold {
//   private userId: string;
//   private entity;
//   private firebaseList;

//   private path = '/profiles';

//   constructor(private db: AngularFireDatabase, private auth: AuthService) {    
//     this.userId = this.auth.getCurrentUserUid();

//     this.firebaseList = this.db.list(this.path);
//   } 

//   getOwnProfile() {
//     return this.getEntities({
//       orderByChild: 'userId',
//       equalTo: this.userId,
//     })
//     .map((entities) => {
//       let [entity] = entities;
//       this.entity = entity;
//       return entity;
//     })
//     // .do(data => console.log('server data:', data))  // debug - fixme why do i get so many responses?
//   }

//   // getOwnProfile() {       // future impl. TODO
//   //   const uid = this.uid;
//   //   // return this.db.object('/profiles/uid/' + uid);    
//   //   // return this.db.object(`/profiles/uid/${this.uid}`);    
//   // }

//   getEntities(query={}): FirebaseListObservable<any> {    
//     return this.db.list(this.path, {
//       query: query
//     });
//   }

//   private create(data) {    
//     data.userId = this.userId;
//     this.firebaseList.push(data);    
//   }

//   private update(key, data) {
//     this.firebaseList.update(key, data);
//   }

//   public upsert(data) {
//     if (this.entity) {
//       this.update(this.entity.$key, data);
//     } else {
//       this.create(data);
//     }
//   }
// }
