import { ResearcherProfileService } from './researcher-profile.service';
import { ResearcherProfileComponent } from './researcher-profile.component';
import { ViewResearcherProfileComponent } from './view-researcher-profile.component';
import { ProfilesComponent } from './profiles.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  imports: [
    SharedModule    
  ],
  declarations: [
    ResearcherProfileComponent,
    ViewResearcherProfileComponent,
    ProfilesComponent,
  ],
  providers : [
    ResearcherProfileService,    
  ]
})
export class ProfileModule { }
