import { AuthGuard } from './../shared/auth.guard';
import { ResearcherProfileService } from './researcher-profile.service';
import { ResearcherProfileComponent } from './researcher-profile.component';
import { ViewResearcherProfileComponent } from './view-researcher-profile.component';
import { ProfilesComponent } from './profiles.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'profile',
        component: ResearcherProfileComponent,
        canActivate: [AuthGuard],
        data: { animation: 'profile' }
      },
      {
        path: 'profiles',
        component: ProfilesComponent,
        canActivate: [AuthGuard],
        data: { animation: 'profiles' }
      }, 
    ]),    
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
