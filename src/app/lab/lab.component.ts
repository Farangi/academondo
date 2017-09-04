import { Component, OnInit } from '@angular/core';

import { FieldOfInterestService } from '../shared';
import { Lab, FieldOfInterest } from '../shared/models/';


@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {

  model: Lab; //= new Lab('Google Labs', 'street of science 10110', 'valid@email.com',);
  loading = false;
  public fieldOfInterests: FieldOfInterest[];

constructor(private fieldOfInterestService: FieldOfInterestService) { }

  ngOnInit() {    
    this.fieldOfInterestService.getFieldOfInterest$()
      .subscribe(fieldOfInterests => this.fieldOfInterests = fieldOfInterests);
  }

  labSubmit() {
    this.loading = true;
    console.log('make http.post call', this.model);
    this.loading = false;
  }
}
