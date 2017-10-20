// import { Observable } from 'rxjs/Rx';
// import { Http, Response } from '@angular/http';
// import { Injectable } from '@angular/core';

// @Injectable()
// export class BestPracticeService {

//   /**
//    * Creates a new NameListService with the injected Http.
//    * @param {Http} http - The injected Http.
//    * @constructor
//    */
//   constructor(private http: Http) { }

//   /**
//    * Returns an Observable for the HTTP GET request for the JSON resource.
//    * @return {string[]} The Observable for the HTTP request.
//    */
//   get(): Observable<string[]> {
//     return this.http.get('assets/data.json')
//       .map((res: Response) => res.json())
//       //.do(data => console.log('server data:', data))  // debug
//       .catch(this.handleError);
//   }

//   /**
//     * Handle HTTP error
//     */
//   private handleError(error: any) {
//     // In a real world app, we might use a remote logging infrastructure
//     // We'd also dig deeper into the error to get a better message
//     let errMsg = (error.message) ? error.message :
//       error.status ? `${error.status} - ${error.statusText}` : 'Server error';
//     console.error(errMsg); // log to console instead
//     return Observable.throw(errMsg);
//   }
// }


// // /**
// //  * Handle the nameListService observable
// //  */
// // getNames() {
// //   this.nameListService.get()
// //     .subscribe(
// //     names => this.names = names,
// //     error => this.errorMessage = <any>error
// //     );
// // }


// //2nd approach

// // import { Injectable } from '@angular/core';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// @Injectable()
// export class RegistrationService {
//   visitors: FirebaseListObservable<any[]>;

//   constructor(private db: AngularFireDatabase) {
//     this.visitors = db.list('/visitors');
//   }

//   updateVisitor(key, updatedVisitor) {
//     this.visitors.update(key, updatedVisitor);
//   }

//   createVisitor(visitor) {
//     this.visitors.push(visitor);
//   }

//   upsertVisitor(visitor) {
//     if (visitor.$key) {
//       this.updateVisitor(visitor.$key, visitor);
//     } else {
//       this.createVisitor(visitor);
//     }
//   }
// }
// // and using it in the component:


// // testVistors: FirebaseListObservable<any[]>;

// // constructor(private service: RegistrationService) {
// //   this.testVistors = service.visitors;
// // }