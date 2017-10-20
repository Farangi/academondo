import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/take';

import { apiEndPoint } from './consts';
import { FieldOfInterest } from './models';

@Injectable()
export class FieldOfInterestService {

  public getFieldOfInterest$() {
    return this.db.list('/fieldOfInterests', ref => 
      ref.orderByChild('name'))
      .valueChanges()
      .take(1)
      .catch(() => Observable.throw('Unable to fetch Field Of Interests!'))
  }

  // public getFieldOfInterest$Old() {
  //   let url = apiEndPoint + '/api/fieldOfInterest';
  //     return this.http.get(url)
  //       .map((response) => {
  //         const responseAsJson = response.json();
  //         return responseAsJson;
  //       })
  //       .catch(() => Observable.throw('Unable to fetch Field Of Interests!'))
  //       .publishLast()
  //       .refCount()
  //   }

  constructor(private http: Http, private db: AngularFireDatabase, ) {
    
    // this.getFieldOfInterest$Old()
    // .flatMap(list => list)
    // .subscribe((data: any) => {
    //   console.log(data)
    //   const tkey = this.db.list('/fieldOfInterests').push({name: data.name, desc: data.desc})
      
    // })        
  }
}
