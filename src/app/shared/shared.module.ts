import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { environment } from '../../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';


import { DynamicFormQuestionComponent } from '../shared/dynamic-form-question/dynamic-form-question.component';
import { BootstrapTestComponent } from '../bootstrap-test/bootstrap-test.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MyAcademondoComponent } from '../my-academondo/my-academondo.component';
import { UserSettingsService } from '../user-settings.service';
import { PubmedViewerComponent } from '../pubmed-viewer/pubmed-viewer.component';
import { SearchAlgoliaService } from '../shared/search-algolia.service';
import { SearchComponent } from '../search/search/search.component';
import { SearchboxComponent } from '../search/searchbox/searchbox.component';
import { PagerComponent } from '../search/pager/pager.component';
import { ResultsComponent } from '../search/results/results.component';
import { RefinementListComponent } from '../search/refinement-list/refinement-list.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LabsignupComponent } from '../labsignup/labsignup.component';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { LoginComponent } from '../login/login.component';
import { AlertComponent } from '../alert/alert.component';
import { LabComponent } from '../lab/lab.component';
import { PageNotFoundComponent } from '../page-not-found.component';
import { CvComponent } from '../cv/cv.component';
import { PubmedComponent } from '../pubmed/pubmed.component';
import { LablistComponent } from '../lablist/lablist.component';
import { LabDetailsComponent } from '../lab-details/lab-details.component';
import { AdminPageComponent } from '../admin-page/admin-page.component';
import { AdvertComponent } from '../advert/advert.component';
import { DynamicFormComponent } from '../shared/dynamic-form/dynamic-form.component';
import {
  FieldOfInterestService,
  ValidationService,
  NewsService,
  AlertService,
  AuthenticationService,
  AuthGuard,
  LabService,
  PubmedService,
  LaboratoryTechniqueService,
  UrlSizeLimiterPipe,
  CountryService,
  AdminGuard,
  UniversityGuard,
  QuestionControlService,
  QuestionService,
} from '.';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuthProvider } from 'angularfire2/auth';

import {
  AuthMethods,
  AuthProvider,
  FirebaseUIAuthConfig,
  FirebaseUIModule,
  AuthProviderWithCustomConfig
} from 'firebaseui-angular';

import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdFormFieldModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
  MdStepperModule,
} from '@angular/material';
  //MaterialModule

import 'hammerjs';


import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UniversityComponent } from './university/university.component';



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
    // AuthProvider.Phone
  ],
  method: AuthMethods.Popup,
  tos: '../../assets/ToS.txt' // TODO Terms of service
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    // routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),    
    LeafletModule.forRoot(),

    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdFormFieldModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    MdStepperModule,    

    MultiselectDropdownModule,

    NgbModule.forRoot(),    
  ],
  exports : [
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    CommonModule,
    FormsModule,



    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    LabsignupComponent,
    AutocompleteComponent,
    LoginComponent,
    AlertComponent,
    LabComponent,
    PubmedComponent,
    LablistComponent,
    UrlSizeLimiterPipe,
    LabDetailsComponent,
    AdminPageComponent,
    AdvertComponent,
    PageNotFoundComponent,
    CvComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    BootstrapTestComponent,
    NavbarComponent,
    SidenavComponent,
    MyAcademondoComponent,
    PubmedViewerComponent,
    SearchComponent,
    SearchboxComponent,
    PagerComponent,
    ResultsComponent,
    RefinementListComponent,


    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdFormFieldModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    MdStepperModule,    

  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    LabsignupComponent,
    AutocompleteComponent,
    LoginComponent,
    AlertComponent,
    LabComponent,
    PubmedComponent,
    LablistComponent,
    UrlSizeLimiterPipe,
    LabDetailsComponent,
    AdminPageComponent,
    AdvertComponent,
    PageNotFoundComponent,
    CvComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    BootstrapTestComponent,
    NavbarComponent,
    SidenavComponent,
    MyAcademondoComponent,
    PubmedViewerComponent,
    SearchComponent,
    SearchboxComponent,
    PagerComponent,
    ResultsComponent,
    RefinementListComponent,
    UniversityComponent,
  ],
  providers: [
    FieldOfInterestService,
    ValidationService,
    NewsService,
    AlertService,
    AuthenticationService,
    AuthGuard,
    LabService,
    PubmedService,
    LaboratoryTechniqueService,
    CountryService,
    AdminGuard,
    UniversityGuard,
    UserSettingsService,
    SearchAlgoliaService,
  ],
})
export class SharedModule { }
