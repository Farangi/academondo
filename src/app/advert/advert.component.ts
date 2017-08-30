import { Component, OnInit } from '@angular/core';

import { QuestionService } from "../shared";

@Component({
  selector: 'app-advert',
  template: `
  <div class="">
    <h2>Job advertisement form</h2>
    <dynamic-form [questions]="questions"></dynamic-form>
  </div>
  `,
  styleUrls: ['./advert.component.css'],
  providers: [QuestionService]
})
export class AdvertComponent implements OnInit {
  questions: any[];
  
   constructor(service: QuestionService) {
     this.questions = service.getQuestions();
     console.log(this.questions)
   }

  ngOnInit() {
  }

}
