import { query } from '@angular/core/src/animation/dsl';
import { ResearcherProfileService } from './../profiles/researcher-profile.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthenticationService } from '../shared/authentication.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-username',
  templateUrl: './view-username.component.html',
  styleUrls: ['./view-username.component.css']
})
export class ViewUsernameComponent implements OnInit {

  @Input() userKey;
  @Input() owner;
  name: string;

  constructor(private db: AngularFireDatabase, private ResearcherProfileService: ResearcherProfileService) { }

  ngOnInit() {
    this.db.object(`users/${this.userKey}/email`)
    .subscribe(name => {
      this.name = name.$value;
    })
  }

  viewProfile() {

    this.ResearcherProfileService.getEntities({
      orderByChild: 'userId',
      equalTo: this.userKey,
    })
    .map((entities) => {
      let [entity] = entities;
      return entity;
    })
    .subscribe(profile => {
      console.log(profile, profile.$key);
    })

    // open a dialog with profile
  }

}
