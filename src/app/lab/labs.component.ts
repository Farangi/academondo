import { LabService } from './lab.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})
export class LabsComponent implements OnInit {
  labs: Observable<any>;

  constructor(private labService: LabService) { }

  ngOnInit() {
    this.labs = this.labService.getEntities()
  }

}
