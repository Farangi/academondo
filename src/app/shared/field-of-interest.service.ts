import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/publishLast';

import { FieldOfInterest, apiEndPoint } from '../shared';

interface mongoDBFieldOfInterest {
  _id: string;
  field: string;
  desc: string
}

@Injectable()
export class FieldOfInterestService {

  public getFieldOfInterest$() {
  let url = apiEndPoint + '/api/fieldOfInterest';
    return this.http.get(url)
      .map((response) => {
        const responseAsJson = response.json();
        return responseAsJson;
      })
      .catch(() => Observable.throw('Unable to fetch Field Of Interests!'))
      .publishLast()
      .refCount()
  }

  constructor(private http: Http) { }
}
