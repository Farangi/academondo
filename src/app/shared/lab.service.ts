import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Lab, apiEndPoint } from '../shared';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/publishLast';

@Injectable()
export class LabService {
  
  private url = apiEndPoint +'/api/lab';
  private requestStream: Observable<any>;

  constructor(private http: Http) {        
    this.requestStream = http.get(this.url)    
    .map((response) => {      
     const responseAsJson= response.json();
     return responseAsJson;    
   })
   .catch(() => Observable.throw('Unable to fetch labs!'))
   .publishLast()
   .refCount()  

   
  }

  saveLab(lab: Lab) {
    let headers = ""
    let arg =({
      headers: new Headers({'Content-Type': 'application/json'})  
    });
    return this.http.post(this.url, lab, arg)
      .map((response: Response) => response.json());
  }

  getLab$() {
    return this.requestStream;
  }
}
