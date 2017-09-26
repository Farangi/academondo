import { LabService } from './lab.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {
  questions: any[];
  path: string;
  lab;

  constructor(private labService: LabService) { }

  ngOnInit() {
    this.questions = this.labService.getQuestions();
    this.path = this.labService.getPath();
    this.lab = this.labService.getOwnEntity();
  }

}
