import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-view-profile-dialog',
  template: `  
    <md-dialog-content class="am-width">      
      <app-view-researcher-profile [profileObservable]="profile"></app-view-researcher-profile>      
    </md-dialog-content>
    <md-dialog-actions>      
    </md-dialog-actions>
  `,
  styles: ['.am-width { width: 456px, max-width: 90vw }']
})
export class ViewProfileDialogComponent implements OnInit {

  profile;
  constructor(    
    public dialogRef: MdDialogRef<ViewProfileDialogComponent>) { }

  ngOnInit() {
    this.profile = this.dialogRef.componentInstance.profile
  }

}
