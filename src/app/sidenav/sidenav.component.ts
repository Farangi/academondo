import { AuthService, AuthenticationService } from './../shared';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  
  @Input() isActive:boolean = true;
  showMenu = '';
  user;

  isAdmin: any = this.authService.isAdmin$;
  isUniversity: any = this.authService.isUniversity$;    
  
  
  eventCalled() {      
      this.isActive = !this.isActive;
  }
  addExpandClass(element: any) {
      if (element === this.showMenu) {
          this.showMenu = '0';
      } else {
          this.showMenu = element;
      }
  }
  
  constructor(private authService: AuthService, private authenticationService: AuthenticationService) {
      authenticationService.getUser$().subscribe(user => {
          this.user = user
      });
  }

  ngOnInit() {
  }

}
