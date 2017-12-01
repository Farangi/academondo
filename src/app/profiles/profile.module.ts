import { ViewProfileDialogComponent } from './view-profile-dialog.component';
import { AuthGuard } from './../shared/auth.guard';
import { ResearcherProfileService } from './researcher-profile.service';
import { ResearcherProfileComponent } from './researcher-profile.component';
import { ViewResearcherProfileComponent } from './view-researcher-profile.component';
import { ProfilesComponent } from './profiles.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { StepperProfileComponent } from './stepper-profile.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { animation: 'profile' }
      },      
      {
        path: 'profile1',
        component: ResearcherProfileComponent,
        canActivate: [AuthGuard],
        data: { animation: 'profile1' }
      },
      {
        path: 'profiles',
        component: ProfilesComponent,
        canActivate: [AuthGuard],
        data: { animation: 'profiles' }
      }, 
      {
        path: 'stepperProfile',
        component: StepperProfileComponent,
        canActivate: [AuthGuard],
        data: { animation: 'stepperProfile' }
      },       
    ]),    
    SharedModule    
  ],
  declarations: [
    ResearcherProfileComponent,
    ViewResearcherProfileComponent,
    ProfilesComponent,
    ViewProfileDialogComponent,
    ProfileComponent,
    StepperProfileComponent
  ],
  providers : [
    ResearcherProfileService,    
  ],
  entryComponents: [
    ViewProfileDialogComponent
  ]
})
export class ProfileModule { }
