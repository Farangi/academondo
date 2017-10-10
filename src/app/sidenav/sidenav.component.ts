import { slideOpen } from './../_animations/slideOpen';
import { NavService } from './../shared/nav.service';
import { Roles } from './../shared/models/user';
import { AuthenticationService } from './../shared';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [slideOpen]
})
export class SidenavComponent implements OnInit {
  
  isActive:boolean;
  showMenu = '';
  user;
  pinned:boolean;
//   pinned = true;

  isAdmin: any = this.authenticationService.getRoles;
  isUniversity: any = this.authenticationService.getRoles;    
  
  addExpandClass(element: any) {
      if (element === this.showMenu) {
          this.showMenu = '0';
      } else {
          this.showMenu = element;
      }
  }
  
  constructor(private authenticationService: AuthenticationService, private navService: NavService) { }

  hideSidenav() {
      this.navService.toggleSidenav(this.pinned)
  }

  togglePinState() {      
      this.navService.togglePinned(!this.pinned)
  }

  ngOnInit() {
    this.pinned = this.navService.pinState;
      
      this.authenticationService.getUser$()
      .subscribe(user => {
          this.user = user
      });

      this.navService.sidenavState$    
      .subscribe(state => {
          this.isActive = state;
      })
      
      
  }

}
