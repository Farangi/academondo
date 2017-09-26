import { AuthenticationService } from './../shared/authentication.service';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { FieldOfInterestService } from '../shared/field-of-interest.service';
import { Injectable, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CountryService } from '../shared/country.service';
import { LaboratoryTechniqueService } from '../shared/laboratory-technique.service';
import { DropdownQuestion, QuestionBase, TextboxQuestion,
    TextareaQuestion, MultiselectQuestion, Country, AutocompleteQuestion } from '../shared/models';

@Injectable()
export class ResearcherProfileService {

    countryOptions = [];
    techniquesOptions = [];
    fieldOfInterestOptions = [];

    userRoles: Array<string>; // roles of current logged in user

    private userId: string;

    private path = '/profiles';

    constructor(private countryService: CountryService, private laboratoryTechniqueService: LaboratoryTechniqueService, private fieldOfInterestService: FieldOfInterestService, private db: AngularFireDatabase, private authenticationService: AuthenticationService) {
        
        // let userId = this.auth.getCurrentUserUid();        
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

    private matchingRole(allowedRoles): boolean {
        return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
    }

    getPath(): string {
        return this.path;
    }

    getOwnProfile() {        
        if (!this.userId) {
            return Observable.of(null)
        } else {        
            return this.getEntities({
                orderByChild: 'userId',
                equalTo: this.userId,
            })
                .map((entities) => {                    
                    let [entity] = entities;
                    return entity;
                })
            // .do(data => console.log('server data:', data))  // debug - fixme why do i get so many responses?
        }
    }

    getEntities(query = {}): FirebaseListObservable<any> {
        return this.db.list(this.path, {
            query: query
        });
    }

    getQuestions() {

        let questions: QuestionBase<any>[] = [

            new TextboxQuestion({
                key: 'firstName',
                label: 'First name',
                required: true,                
                order: 1
            }),

            new TextboxQuestion({
                key: 'lastName',
                label: 'Last name',
                order: 2
            }),

            new TextboxQuestion({
                key: 'title',
                label: 'Title',                
                order: 3
            }),            

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