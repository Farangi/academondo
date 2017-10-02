import { ViewUsernameComponent } from './view-username.component';
import { LabsComponent } from './labs.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './../shared/auth.guard';
import { LabComponent } from './lab.component';
import { LabService } from './lab.service';
import { ViewLabComponent } from './view-lab.component';
import { ManageLabComponent } from './manage-lab.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'lab',
        component: LabComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manageLab',
        component: ManageLabComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'labs',
        component: LabsComponent,
        canActivate: [AuthGuard]
      },      
    ]),
    SharedModule    
  ],
  declarations: [LabComponent, ViewLabComponent, LabsComponent, ManageLabComponent, ViewUsernameComponent],
  providers: [LabService]
})
export class LabModule { }
