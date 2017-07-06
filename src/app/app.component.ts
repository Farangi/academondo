import { Component } from '@angular/core';

import { AuthService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  isAuthenticated: boolean = false;
  user: any = {};

  constructor(private authService: AuthService) {
    this.authService.af.authState.subscribe(user => this.userState(user),
    error => console.trace(error)
    )
  }


    private userState(user: any = null) {
    if(user) {
      this.isAuthenticated = true;
      this.user = this.getUserInfo(user);
    }
    else {
      this.isAuthenticated = false;      
      this.user = {};
    }
  }

  private getUserInfo(user: any): any {
    if(!user) {
      return {};
    }
    let data = user.providerData[0];
    console.log(data);
    return {
      name: data.displayName,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId
    };
  }  
}
