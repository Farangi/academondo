import { ResearcherProfile } from '../shared/models/researcher-profile';
import { ResearcherProfileService } from './researcher-profile.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-researcher-profile',
  templateUrl: './view-researcher-profile.component.html',
  styleUrls: ['./view-researcher-profile.component.css']
})
export class ViewResearcherProfileComponent implements OnInit {
  @Input() profileObservable;
  profile: ResearcherProfile;

  constructor() {
  
   }

  ngOnInit() {
    this.profileObservable
      .subscribe(data => {
        this.profile = data
      });
  }

}
