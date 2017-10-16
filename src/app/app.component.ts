import { AuthenticationService } from './shared/authentication.service';
import { OnInit } from '@angular/core';
import { routerAnimation } from './_animations/routerAnimation';
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   animations: [routerAnimation]
// })
// export class AppComponent {
//   // change the animation state
//   getRouteAnimation(outlet) {
//     return outlet.activatedRouteData.animation
//   }  
//  }

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

/**
 * DemoApp with toolbar and sidenav.
 */
@Component({  
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimation],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class AppComponent implements OnInit {
  dark = false;
  navItems = [
    { name: 'dashboard', route: '/dashboard' },
    { name: 'my academondo', route: '/my-academondo' },
    { name: 'Create laboratory', route: '/lab' },
    { name: 'Manage laboratory', route: '/manageLab' },        
    { name: 'laboratories', route: '/labs' },
    { name: 'job adverts', route: '/adverts' },
    { name: 'create profile', route: '/profile' },
    { name: 'profiles', route: '/profiles' }
  ];

  user: any;

  constructor(
    private authenticationService: AuthenticationService,    
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _overlayContainer: OverlayContainer) { }

  ngOnInit() {   

    this.authenticationService.getUser$()
      .subscribe(user => {
        this.user = user
      })
  }    

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }
    
  toggleFullscreen() {
    let elem = this._element.nativeElement.querySelector('.demo-content');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullScreen) {
      elem.msRequestFullScreen();
    }
  }
}