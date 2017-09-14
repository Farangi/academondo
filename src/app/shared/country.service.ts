import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/publishLast';

@Injectable()
export class CountryService {

  public getCountry$() {
    let url = 'https://restcountries.eu/rest/v2/all?fields=name';
    return this.http.get(url)    
    .map((response) => {      
     const responseAsJson= response.json();     
     return responseAsJson;    
   })
   .catch(() => Observable.throw('Unable to fetch countries!'))
   .publishLast()
   .refCount()   
  }
  
  constructor(private http: Http) {}
}
