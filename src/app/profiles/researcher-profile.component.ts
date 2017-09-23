import { ResearcherProfileService } from './researcher-profile.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advert',
  templateUrl: './researcher-profile.component.html',  
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