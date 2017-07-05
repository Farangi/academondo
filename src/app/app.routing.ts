import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LabsignupComponent } from './labsignup/labsignup.component';
import { LabComponent } from './lab/lab.component';
import { LablistComponent } from './lablist/lablist.component';
import { LabDetailsComponent } from './lab-details/lab-details.component';
import { PubmedComponent } from './pubmed/pubmed.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdvertComponent } from "./advert/advert.component";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared';
import { AdminGuard } from './shared';

import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [         
    {
        path: 'dashboard',
        component: DashboardComponent,
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
        path: 'adverts',
        component:  AdvertComponent,
        canActivate: [AdminGuard]        
    },              
    {
        path: 'admin',
        component: AdminPageComponent,
        canActivate: [AdminGuard]        
    },         
    {
        path: 'login',
        component: LoginComponent
    },          
        {
        path: 'register',
        component: RegisterComponent
    },     
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
]

export const routing = RouterModule.forRoot(routes);