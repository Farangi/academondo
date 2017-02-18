import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishReplay';

import { newsUpdate, apiEndPoint } from '../shared';

@Injectable()
export class NewsService {

   private requestStream: Observable<any>;     

   public getNews$() {
     return this.requestStream;
   } 

  constructor(private http: Http) {    
    let url = apiEndPoint + '/api/news';
      this.requestStream = Observable.interval(10000)
      .startWith(null)
      .mergeMap(() => http.get(url))        
      .map((response) => {        
        return response.json()
      })
      .catch(() => Observable.throw('Unable to fetch news!'))
      .publishReplay(1)
      .refCount()      
    }
}
