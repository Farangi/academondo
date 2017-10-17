import { AuthenticationService } from './shared/authentication.service';
import { OnInit } from '@angular/core';
import { routerAnimation } from './_animations/routerAnimation';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
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
    { name: 'Dashboard', route: '/dashboard' },
    // { name: 'My academondo', route: '/my-academondo' },
    { name: 'Create laboratory', route: '/lab' },
    { name: 'Manage laboratory', route: '/manageLab' },        
    { name: 'Laboratories', route: '/labs' },    
    { name: 'Create profile', route: '/profile' },
    { name: 'Profiles', route: '/profiles' },
    { name: 'Job adverts', route: '/adverts' },
  ];

  user: any;
  backgroundImageStyle: SafeStyle;

  constructor(
    private authenticationService: AuthenticationService,    
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _overlayContainer: OverlayContainer,
    private authService: AuthenticationService,
    private sanitizer: DomSanitizer ) { }

  ngOnInit() {
    this.backgroundImageStyle = this.getBackgroundImageStyle();

    this.authenticationService.getUser$()
      .subscribe(user => {
        this.user = user
      })
  }

  private getBackgroundImageStyle() {
    let backgroundImage = '../../assets/background.png';

    // sanitize the style expression
    const style = `
      background-image: url(${backgroundImage})
      background-size: cover;
    `;
    return this.sanitizer.bypassSecurityTrustStyle(style)
  } 

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }

  signOut() {
    this.authService.signOut();
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