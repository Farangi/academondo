
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './../shared/auth.guard';
import { LabComponent } from './lab.component';
import { LabService } from './lab.service';
import { ViewLabComponent } from './view-lab.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'lab',
        component: LabComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'viewLab',
        component: ViewLabComponent,
        canActivate: [AuthGuard]
      },
    ]),
    SharedModule         
  ],
  declarations: [LabComponent, ViewLabComponent],
  providers: [LabService]
})
export class LabModule { }
