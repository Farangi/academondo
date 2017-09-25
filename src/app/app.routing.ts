import { UniversityComponent } from './shared/university/university.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { SearchComponent } from './search/search/search.component';
import { MyAcademondoComponent } from './my-academondo/my-academondo.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LabsignupComponent } from './labsignup/labsignup.component';
import { LabComponent } from './lab/lab.component';
import { LablistComponent } from './lablist/lablist.component';
import { LabDetailsComponent } from './lab-details/lab-details.component';
import { PubmedComponent } from './pubmed/pubmed.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdvertComponent } from './advert/advert.component';
import { ResearcherProfileComponent } from './profiles/researcher-profile.component';
import { BootstrapTestComponent } from "./bootstrap-test/bootstrap-test.component";

import { LoginComponent } from './login/login.component';
import { CvComponent } from './cv/cv.component';
import { AuthGuard } from './shared';
import { AdminGuard, UniversityGuard } from './shared';

import { CanDeactivate } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { LeaveComponentGuard } from './shared/leave-component.guard';

const routes: Routes = [
   
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        // canDeactivate: [LeaveComponentGuard]
    },
    {
        path: 'my-academondo',
        component: MyAcademondoComponent,
        canActivate: [AuthGuard]
    },    
    {
        path: 'labsignup',
        component: LabsignupComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'lab',
        component: LabComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'labs',
        component: LablistComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'lab:id',
        component: LabDetailsComponent,
        canActivate: [AuthGuard]  
    },
    {
        path: 'PubMed',
        component: PubmedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuard]
    },    
    {
        path: 'adverts',
        component:  AdvertComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cv',
        component: CvComponent,
        canActivate: [AuthGuard]
    },   
    {
        path: 'bs',
        component: BootstrapTestComponent,
        canActivate: [AuthGuard]
    },    
    {
        path: 'admin',
        component: AdminPageComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'university',
        component: UniversityComponent,
        canActivate: [UniversityGuard]
    },    
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },    
    {
        path: '**',
        pathMatch: 'full',
        component: PageNotFoundComponent
    }
];

export const routing = RouterModule.forRoot(routes);
