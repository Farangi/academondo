import { ResearcherProfile } from '../shared/models/researcher-profile';
import { ResearcherProfileService } from './researcher-profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-researcher-profile',
  templateUrl: './view-researcher-profile.component.html',
  styleUrls: ['./view-researcher-profile.component.css']
})
export class ViewResearcherProfileComponent implements OnInit {
  profile: ResearcherProfile = new ResearcherProfile;

  constructor(private profileService: ResearcherProfileService) {
  
   }

  ngOnInit() {
    this.profileService.getOwnProfile()
      .subscribe(data => {
        this.profile = data
      });
  }

}
