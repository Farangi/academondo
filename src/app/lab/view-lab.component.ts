import { AuthenticationService } from './../shared/authentication.service';
import { LabService } from './lab.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-lab',
  templateUrl: './view-lab.component.html',
  styleUrls: ['./view-lab.component.css']
})
export class ViewLabComponent implements OnInit {
  objectKeys(items) {
    if (items) {
      return Object.keys(items);
    }
  }  

  @Input() lab: any;
  @Input() view: boolean;

  haveApplied: boolean;
  isMember: boolean;
  isOwner: boolean;

  constructor(private labService: LabService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.isApplicant(this.lab);
    this.isMemberOf(this.lab);
    this.isOwnLab(this.lab);
  }

  apply(key) {    
    this.labService.apply(key);
  }

  unApply(key) {
    this.labService.removeApplicant(key);
  }

  leave(key) {
    this.labService.leave(key);
  }

  isApplicant(lab) {
    this.labService.isApplicant(lab.$key)    
    .subscribe(value => {
      this.haveApplied = value;
    })
  }

  isMemberOf(lab) {
    this.labService.isMember(lab.$key)
      .subscribe(value => {        
        this.isMember = value;
      })
  }

  isOwnLab(lab) {
    this.isOwner =  this.labService.isOwnLab(lab);
  }
  



}
