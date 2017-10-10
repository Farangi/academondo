import { animation } from '@angular/core/src/animation/dsl';
import { UniversityComponent } from './shared/university/university.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { SearchComponent } from './search/search/search.component';
import { MyAcademondoComponent } from './my-academondo/my-academondo.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
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
        data: { animation: 'dashboard'}
        // canDeactivate: [LeaveComponentGuard]
    },
    {
        path: 'my-academondo',
        component: MyAcademondoComponent,
        canActivate: [AuthGuard],
        data: { animation: 'my-academondo' }
    },    
    {
        path: 'PubMed',
        component: PubmedComponent,
        canActivate: [AuthGuard],
        data: { animation: 'PubMed' }        
    },
    {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuard],
        data: { animation: 'search' }
    },    
    {
        path: 'adverts',
        component:  AdvertComponent,
        canActivate: [AuthGuard],
        data: { animation: 'adverts' }
    },
    {
        path: 'cv',
        component: CvComponent,
        canActivate: [AuthGuard],
        data: { animation: 'cv' }
    },   
    {
        path: 'bs',
        component: BootstrapTestComponent,
        canActivate: [AuthGuard],
        data: { animation: 'bs' }
    },    
    {
        path: 'admin',
        component: AdminPageComponent,
        canActivate: [AdminGuard],
        data: { animation: 'admin' }
    },
    {
        path: 'university',
        component: UniversityComponent,
        canActivate: [UniversityGuard],
        data: { animation: 'university' }
    },    
    {
        path: 'login',
        component: LoginComponent,
        data: { animation: 'login' }
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
        data: { animation: ' '}
    },    
    {
        path: '**',
        pathMatch: 'full',
        component: PageNotFoundComponent,
        data: { animation: '**' }
    }
];

export const routing = RouterModule.forRoot(routes);
