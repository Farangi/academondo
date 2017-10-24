import { AuthenticationService } from './../shared/authentication.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FieldOfInterestService } from '../shared/field-of-interest.service';
import { Injectable, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CountryService } from '../shared/country.service';
import { LaboratoryTechniqueService } from '../shared/laboratory-technique.service';
import {
  DropdownQuestion, QuestionBase, TextboxQuestion,
  TextareaQuestion, MultiselectQuestion, Country, AutocompleteQuestion
} from '../shared/models';

@Injectable()
export class LabService {

  countryOptions = [];
  techniquesOptions = [];
  fieldOfInterestOptions = [];

  userRoles: Array<string>; // roles of current logged in user

  private userId: string;

  private path = '/labs';  
  haveApplied$: Observable<any>;

  constructor(
    private countryService: CountryService, private laboratoryTechniqueService: LaboratoryTechniqueService,
    private fieldOfInterestService: FieldOfInterestService, private db: AngularFireDatabase,
    private authenticationService: AuthenticationService
  ) { 
    this.userId = this.authenticationService.getUserId() //rework!

    authenticationService.user.map(user => {
      return this.userRoles = _.keys(_.get(user, 'roles'))
    })
      .subscribe()

    this.countryService.getCountry$()
      .flatMap(list => list)
      .subscribe((data: any) => {
        this.countryOptions.push(data)
      })

    this.laboratoryTechniqueService.getlabTechnique$()
      .flatMap(list => list)
      .subscribe((data: any) => {
        this.techniquesOptions.push(data)
      })

    this.fieldOfInterestService.getFieldOfInterest$()
      .flatMap(list => list)
      .subscribe((data: any) => {
        this.fieldOfInterestOptions.push(data)
      })    
  }

  delete(labKey) {
    this.db.object(`${this.path}/${labKey}`).remove();    
  }
  
  apply(labKey) {    
    const data = { [this.userId]: true }
    const applicants = this.db.object(`${this.path}/${labKey}/applicants`)
    applicants.update(data);
  }
  applylist(labKey) {
    const data = { ['applied']: true }
    const lab = this.db.list(`${this.path}/${labKey}/`)
    lab.update(`/applicants/${this.userId}`, data)
  }

  acceptApplicant(labKey, uid) {
    const data = { [uid]: true }
    const members = this.db.object(`${this.path}/${labKey}/members`)
    members.update(data);
    this.removeApplicant(labKey, uid);
  }

  acceptApplicantlist(labKey, uid) {
    const data = { [uid]: true }
    const members = this.db.list(`${this.path}/${labKey}/members`)
    members.push(data);
    this.removeApplicant(labKey, uid);

  }

  isMember(labKey) {    
    return this.isPartOf('members', labKey);
  }

  isApplicant(labKey): Observable<boolean> {
    
    return this.isPartOf('applicants', labKey);
  }

  isOwnLab(lab): boolean {    
    return this.userId === lab.userId;
  }  

  private isPartOf(path, labKey): Observable<boolean> {
    return this.db.object(`${this.path}/${labKey}/${path}/${this.userId}`)
      .valueChanges()
      .map(obj => {
        if (obj) {
          return true
        } else {
          return false
        }
      })
  }  

  leave(labKey) {
    const member = this.db.object(`${this.path}/${labKey}/members/${this.userId}`)
    member.remove();
  }

  private remove(path, labKey, uid?) {    
    let applicant;
    if (uid) {
      applicant = this.db.object(`${this.path}/${labKey}/${path}/${uid}`)
    } else {
      applicant = this.db.object(`${this.path}/${labKey}/${path}/${this.userId}`)
    }
    applicant.remove();
  }
  private removelist(path, labKey, uid?) {    
    let applicant = this.db.list(`${this.path}/${labKey}/${path}`)
    if (uid) {
      applicant.remove(uid)
    } else {
      applicant.remove(this.userId)
    }    
  }

  removeApplicant(labKey, uid?) {
    this.remove('applicants', labKey, uid);
  }

  removeMember(labKey, uid?) {
    this.remove('members', labKey, uid);
  }

  getPath(): string {
    return this.path;
  }

  getOwnEntity() {    
    if (!this.userId) {
      return Observable.of(null)
    } else {
      return this.db.list(this.path , ref => ref.orderByChild('userId').equalTo(this.userId))
        .snapshotChanges().map(actions => {
          return actions.map(action => {
            const $key = action.payload.key;
            return { $key, ...action.payload.val() };
          })
        })
        .map((entities) => {
          let [entity] = entities;
          return entity;
        })
      // .do(data => console.log('server data:', data))  // debug - fixme why do i get so many responses?
    }
  }

  getEntities(): Observable<any> {
    return this.db.list(this.path)
    .snapshotChanges().map(actions => {
      return actions.map(action => {
        const $key = action.payload.key;                
        return { $key, ...action.payload.val()};
      })
    }) 
  }

  getQuestions() {

    let questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'labName',
        label: 'Lab name',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'labLeader',
        label: 'Lab Leader',
        order: 2
      }),

      // new TextboxQuestion({
      //   key: 'title',
      //   label: 'Title',
      //   order: 3
      // }),

      // new TextboxQuestion({
      //     key: 'emailAddress',
      //     label: 'Email',
      //     type: 'email',
      //     order: 3
      // }),

      // new AutocompleteQuestion({
      //     key: 'country',
      //     label: 'Country',
      //     options: this.countryOptions,
      //     order: 4
      // }),

      new DropdownQuestion({
        key: 'country',
        label: 'Country',
        options: this.countryOptions,
        order: 4
      }),

      new TextareaQuestion({
        key: 'about',
        maxLength: '500',
        label: 'About',
        order: 5
      }),

      new MultiselectQuestion({
        key: 'techniques',
        label: 'Techniques',
        options: this.techniquesOptions,
        order: 6
      }),

      // new DropdownQuestion({
      //   key: 'fieldOfInterests',
      //   label: 'Field of interests',
      //   options: this.fieldOfInterestOptions,
      //   order: 6
      // }),      

      new MultiselectQuestion({
        key: 'fieldOfInterests',
        label: 'Field of interests',
        options: this.fieldOfInterestOptions,
        order: 7
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }  

}
