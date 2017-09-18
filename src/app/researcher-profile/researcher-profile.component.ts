import { ResearcherProfileService } from './../shared/researcher-profile.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-advert',
  templateUrl: './researcher-profile.component.html',  
  // template: `
  // <div class="">
  //   <h2>Job advertisement form</h2>
  //   <dynamic-form [questions]="questions" [path]="path" [entity]="profile"></dynamic-form>
  // </div>
  // `,
  providers: [ResearcherProfileService]
})
export class ResearcherProfileComponent implements OnInit {
  questions: any[];
  path: string;
  profile;

  constructor(private profileService: ResearcherProfileService) { }

  ngOnInit() {
    this.questions = this.profileService.getQuestions();
    this.path = this.profileService.getPath();
    this.profile = this.profileService.getOwnProfile();
  }

}