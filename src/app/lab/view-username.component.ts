import { ViewProfileDialogComponent } from './../profiles/view-profile-dialog.component';
import { MdDialog, MdDialogConfig} from '@angular/material'
import { query } from '@angular/core/src/animation/dsl';
import { ResearcherProfileService } from './../profiles/researcher-profile.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthenticationService } from '../shared/authentication.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-username',
  templateUrl: './view-username.component.html',
  styleUrls: ['./view-username.component.css'],
  entryComponents: [
    ViewProfileDialogComponent
  ]
})
export class ViewUsernameComponent implements OnInit {

  @Input() userKey;
  @Input() owner;
  name: string;

  constructor(private db: AngularFireDatabase, private ResearcherProfileService: ResearcherProfileService, public dialog: MdDialog) { }

  ngOnInit() {
    this.db.object(`users/${this.userKey}/email`)
    .subscribe(name => {
      this.name = name.$value;
    })
  }

  viewProfile() {

    let profile = this.ResearcherProfileService.getEntities({
      orderByChild: 'userId',
      equalTo: this.userKey,
    })
    .map((entities) => {
      let [entity] = entities;
      return entity;
    })    

    // let conf = new MdDialogConfig();
    // conf.data = profile;
    // open a dialog with profile
    let dialogRef = this.dialog.open(ViewProfileDialogComponent)
    dialogRef.componentInstance.profile = profile
  }

}
