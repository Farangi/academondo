import { LabService } from './lab.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-lab',
  templateUrl: './view-lab.component.html',
  styleUrls: ['./view-lab.component.css']
})
export class ViewLabComponent implements OnInit {

  lab

  constructor(private labService: LabService) { }

  ngOnInit() {
    this.labService.getOwnEntity()
      .subscribe(data => {
        this.lab = data
      });
  }

}
