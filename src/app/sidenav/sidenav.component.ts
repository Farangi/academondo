import { Roles } from './../shared/models/user';
import { AuthenticationService } from './../shared';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  
  @Input() isActive:boolean;
  showMenu = '';
  user;

  isAdmin: any = this.authenticationService.getRoles;
  isUniversity: any = this.authenticationService.getRoles;    
  
  
//   eventCalled() {      
//       this.isActive = !this.isActive;
//   }
  addExpandClass(element: any) {
      if (element === this.showMenu) {
          this.showMenu = '0';
      } else {
          this.showMenu = element;
      }
  }
  
  constructor(private authenticationService: AuthenticationService) {
      authenticationService.getUser$().subscribe(user => {
          this.user = user
      });
  }

  ngOnInit() {
  }

}
