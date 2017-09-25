// import { Injectable } from '@angular/core';
// import { Http, Headers, Response, URLSearchParams } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map'


// import { apiEndPoint } from './consts';
// // import { apiEndPoint } from '../shared/consts';
 
// @Injectable()
// export class AuthenticationService {
//   auth = false;
//     constructor(private http: Http) { }
 
//     login(username, password) {
//       let url = apiEndPoint + '/api/authenticate';

//       let body = `username=${username}&password=${password}`;
//       let headers = new Headers();
//       headers.append('Content-Type', 'application/x-www-form-urlencoded');   
//         //   JSON.stringify({ username: username, password: password })
//         return this.http.post(url, body, { headers: headers })
//             .map((response: Response) => {
//                 //console.log(response);
//                 // login successful if there's a jwt token in the response
//                 let res = response.json();
//                 if (res) {
//                     if(!res.success) {
//                         console.log(res.msg)
//                     }
//                     if (res.success && res.token) {
//                         // store user details and jwt token in local storage to keep user logged in between page refreshes
//                         localStorage.setItem('currentUser', res.user);
//                         localStorage.setItem(res.user, res.token);
//                     }
//                     return res;
//                 }
                
                
//             });
//     }

//     authenticate(): any {
//       let url = apiEndPoint + '/api/memberinfo';
//       let currentUser = this.currentUser();
//       let token = localStorage.getItem(currentUser);

//       if(currentUser && token) {
//         let headers = new Headers();
//         headers.append('Authorization', token);
//         return this.http.get(url,{ headers: headers })
//             .map((response: Response) => {
//               let res = response.json();
//               if (res) {                  
//                   return res;
//               }
//             })   
//             .catch(() => Observable.throw('Unable to authenticate!'))
//       } else {
//         return false
//       }      
//     }

//     isAdmin():any {
//       let url = apiEndPoint + '/api/admin';
//       let currentUser = this.currentUser();
//       let token = localStorage.getItem(currentUser);

//       if(currentUser && token) {
//         let headers = new Headers();
//         headers.append('Authorization', token);
//         return this.http.get(url,{ headers: headers })
//             .map((response: Response) => {
//               let res = response.json();
//               if (res) {                  
//                   return res;
//               }
//             })   
//             .catch(() => Observable.throw('Unable to authenticate admin!'))
//       } else {
//         return false
//       }  
//     }

//     currentUser() {
//       return localStorage.getItem('currentUser');
//     }
 
//     logout() {
//         // remove user from local storage to log user out
//         let currentUser = this.currentUser();
//         localStorage.removeItem('currentUser');
//         localStorage.removeItem(currentUser);
//     }
// }