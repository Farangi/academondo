import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

import { QuestionService } from "../shared";

@Component({
  selector: 'app-advert',
  template: `
  <div class="">
    <h2>Job advertisement form</h2>
    <dynamic-form [questions]="questions" [path]="path" [entity]="profile"></dynamic-form>
  </div>
  `,
  providers: [QuestionService]
})
export class AdvertComponent implements OnInit {
  questions: any[];
  path: string;
  profile;
  
   constructor(service: QuestionService) {
     this.questions = service.getQuestions();    
     this.path = '/profiles';
     this.profile = service.getOwnProfile();     
   }

  ngOnInit() {
  }

}
