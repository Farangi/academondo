import { AuthenticationService } from '../shared/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isActive = false;
  showMenu = '';
  user;
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
  
  constructor(private authService: AuthenticationService) {
      authService.getUser$().subscribe(user => {
          this.user = user
      });
  }

  ngOnInit() {
  }

}
