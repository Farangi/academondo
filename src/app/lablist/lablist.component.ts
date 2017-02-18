import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Lab, LabService, AlertService, PubmedService } from '../shared';

@Component({
  selector: 'app-lablist',
  templateUrl: './lablist.component.html',
  styleUrls: ['./lablist.component.css']
})
export class LablistComponent implements OnInit {

  public labs: Lab[];
  selectedLab: Lab;


  constructor(private router: Router, private labService: LabService, private alertService: AlertService, private pubmedService:PubmedService) { }

  ngOnInit() {
    this.labService.getLab$()
    .subscribe(labs => this.labs = labs)
  }

  onSelect(lab:Lab) {
    this.selectedLab = lab;
  }

  showDetails() {    
     this.router.navigate(['/lab', this.selectedLab._id]); // fixme
  }

}
