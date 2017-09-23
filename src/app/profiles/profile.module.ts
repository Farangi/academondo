import { DynamicFormComponent } from '../shared/dynamic-form/dynamic-form.component';
import { ResearcherProfileComponent } from './researcher-profile/researcher-profile.component';
import { ViewResearcherProfileComponent } from './view-researcher-profile/view-researcher-profile.component';
import { ProfilesComponent } from './profileList/profiles.component';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  imports: [
    SharedModule    
  ],
  declarations: [
    ResearcherProfileComponent,
    ViewResearcherProfileComponent,
    ProfilesComponent,
  ]
})
export class ProfileModule { }
