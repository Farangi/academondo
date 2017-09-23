import { ResearcherProfileComponent } from './researcher-profile/researcher-profile.component';
import { ProfilesComponent } from './profileList/profiles.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ResearcherProfileComponent,
    ProfilesComponent,
  ]
})
export class ProfileModule { }
