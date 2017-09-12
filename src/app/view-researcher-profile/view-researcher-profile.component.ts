import { ResearcherProfileService } from './../shared/researcher-profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-researcher-profile',
  templateUrl: './view-researcher-profile.component.html',
  styleUrls: ['./view-researcher-profile.component.css']
})
export class ViewResearcherProfileComponent implements OnInit {
  private profile;

  constructor(private profileService: ResearcherProfileService) {
    this.profile = this.profileService.getOwnProfile();
   }

  ngOnInit() {
  }

}
