import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-view-profile-dialog',
  template: `  
    <mat-dialog-content class="am-width">      
      <app-view-researcher-profile [profileObservable]="profile"></app-view-researcher-profile>      
    </mat-dialog-content>
    <mat-dialog-actions>      
    </mat-dialog-actions>
  `,
  styles: ['.am-width { width: 456px, max-width: 90vw }']
})
export class ViewProfileDialogComponent implements OnInit {

  profile;
  constructor(    
    public dialogRef: MatDialogRef<ViewProfileDialogComponent>) { }

  ngOnInit() {
    this.profile = this.dialogRef.componentInstance.profile
  }

}
