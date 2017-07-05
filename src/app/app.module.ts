import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { routing } from './app.routing';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LabsignupComponent } from './labsignup/labsignup.component';
import {
  FieldOfInterestService,
  ValidationService,
  NewsService,
  AlertService,
  AuthenticationService,
  AuthGuard,
  UserService,
  LabService,
  PubmedService,
  LaboratoryTechniqueService,
  UrlSizeLimiterPipe,
  CountryService,
  AdminGuard
} from './shared';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { RegisterComponent } from './register/register.component';
import { LabComponent } from './lab/lab.component';

import { PubmedComponent } from './pubmed/pubmed.component';
import { LablistComponent } from './lablist/lablist.component';
import { LabDetailsComponent } from './lab-details/lab-details.component';

import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdvertComponent } from './advert/advert.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from "@angular/material";

import { PageNotFoundComponent } from './page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    LabsignupComponent,
    AutocompleteComponent,
    LoginComponent,
    AlertComponent,
    RegisterComponent,
    LabComponent,
    PubmedComponent,
    LablistComponent,
    UrlSizeLimiterPipe,
    LabDetailsComponent,
    AdminPageComponent,
    AdvertComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HttpModule,
    routing,
    MultiselectDropdownModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule
  ],
  providers: [
    FieldOfInterestService, 
    ValidationService, 
    NewsService,
    AlertService, 
    AuthenticationService, 
    AuthGuard, 
    UserService, 
    LabService,
    PubmedService,
    LaboratoryTechniqueService,
    CountryService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
