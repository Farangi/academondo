import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/publishLast';

import { apiEndPoint } from '../shared/consts';


@Injectable()
export class LaboratoryTechniqueService {


  // public getlabTechnique$old() {    
  //   let url = apiEndPoint + '/api/labTechnique'
  //   return this.http.get(url)    
  //   .map((response) => {      
  //    const responseAsJson= response.json();
  //    return responseAsJson;    
  //  })
  //  .catch(() => Observable.throw('Unable to fetch lab techniques!'))
  //  .publishLast()
  //  .refCount()   
  // }  

  public getlabTechnique$() {    
    return  this.db.list('/techniques')
  }   
  

  constructor(private http: Http, private db: AngularFireDatabase, ) {

    // this.getlabTechnique$old()
    // .flatMap(list => list)
    // .subscribe((data: any) => {
    //   const tkey = this.db.list('/techniques').push({name: data.name})      
    // })

  }
    

}
