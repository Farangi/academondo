import { Component, OnInit } from '@angular/core';

import { User } from '../shared';
import { UserService, welcomeMsg, initMsg, AuthService } from '../shared';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    welcome = welcomeMsg;
    init = initMsg;
    currentUser;

    constructor(private userService: UserService, private authService: AuthService) {
        this.currentUser = this.authService.getCurrentUserUid();
    }

    ngOnInit() {
    }
}