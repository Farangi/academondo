import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

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
  AdminGuard,
  AuthService,
  ResearcherProfileService,
  QuestionControlService,
  QuestionService,
  ResearcherQService
} from './shared';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LabsignupComponent } from './labsignup/labsignup.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { RegisterComponent } from './register/register.component';
import { LabComponent } from './lab/lab.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CvComponent } from './cv/cv.component';
import { ResearcherProfileComponent } from './researcher-profile/researcher-profile.component';

import { PubmedComponent } from './pubmed/pubmed.component';
import { LablistComponent } from './lablist/lablist.component';
import { LabDetailsComponent } from './lab-details/lab-details.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdvertComponent } from './advert/advert.component';
import { DynamicFormComponent } from './shared/dynamic-form/dynamic-form.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuthProvider } from 'angularfire2/auth';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import {
  AuthMethods,
  AuthProvider,
  FirebaseUIAuthConfig,
  FirebaseUIModule,
  AuthProviderWithCustomConfig
} from 'firebaseui-angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@angular/material';

import 'hammerjs';

// import {SuiModule} from 'ng2-semantic-ui';

// import { CovalentLayoutModule, CovalentStepsModule /*, any other modules */ } from '@covalent/core';
// // (optional) Additional Covalent Modules imports
// import { CovalentHttpModule } from '@covalent/http';
// import { CovalentHighlightModule } from '@covalent/highlight';
// import { CovalentMarkdownModule } from '@covalent/markdown';
// import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';

import { DynamicFormQuestionComponent } from './shared/dynamic-form-question/dynamic-form-question.component';
import { BootstrapTestComponent } from './bootstrap-test/bootstrap-test.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MyAcademondoComponent } from './my-academondo/my-academondo.component';


// const facebookCustomConfig: AuthProviderWithCustomConfig = {
//   provider: AuthProvider.Facebook,
//   customConfig: {
//     scopes: [
//       'public_profile',
//       'email',
//       'user_likes',
//       'user_friends'
//     ],
//     customParameters: {
//       // Forces password re-entry
//       auth_type: 'reauthenticate'
//     }
//   }
// };

const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [
    AuthProvider.Google,
    // facebookCustomConfig,
    AuthProvider.Facebook,
    AuthProvider.Twitter,
    AuthProvider.Github,
    AuthProvider.Password,
    AuthProvider.Phone
  ],
  method: AuthMethods.Popup,
  tos: '<your-tos-link>' // TODO Terms of service
};

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
    PageNotFoundComponent,
    CvComponent,
    ResearcherProfileComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    BootstrapTestComponent,
    NavbarComponent,
    SidenavComponent,
    MyAcademondoComponent
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
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    NgbModule.forRoot(),
    MaterialModule,
    // CovalentLayoutModule,
    // CovalentStepsModule,
    // // (optional) Additional Covalent Modules imports
    // CovalentHttpModule.forRoot(),
    // CovalentHighlightModule,
    // CovalentMarkdownModule,
    // CovalentDynamicFormsModule
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
    AdminGuard,
    AuthService,
    ResearcherProfileService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
