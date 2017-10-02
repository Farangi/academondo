import { Router } from '@angular/router';
// import { ViewUsernameComponent } from './../shared/view-username/view-username.component';
import { LabService } from './lab.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-manage-lab',
  templateUrl: './manage-lab.component.html',
  styleUrls: ['./manage-lab.component.css']
})
export class ManageLabComponent implements OnInit {
  objectKeys(items) {
    if (items) {
      return Object.keys(items);       
    }
  }

  lab
  isMember: boolean
  isOwner: boolean

  constructor(private labService: LabService, private router: Router) { }

  ngOnInit() {    
    this.labService.getOwnEntity()
    .subscribe(lab => {
      this.lab = lab
      if (lab) this.isOwnLab(lab);
    })    
  }

  isOwnLab(lab) {
    this.isOwner = this.labService.isOwnLab(lab);
  }

  acceptApplicant(lab, uid) {
    this.labService.acceptApplicant(lab.$key, uid);
  }

  removeApplicant(lab, uid) {
    this.labService.removeApplicant(lab.$key, uid);
  }

  removeMember(lab, uid) {
    this.labService.removeMember(lab.$key, uid);
  }

  editLab() {
    this.router.navigate(['/lab']);
  }

  delete(lab) {
    this.labService.delete(lab.$key);
  }
}
