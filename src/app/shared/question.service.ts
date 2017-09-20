import { AuthService } from './auth.service';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AutocompleteComponent } from './../autocomplete/autocomplete.component';
import { FieldOfInterestService } from './field-of-interest.service';
import { Injectable }       from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { CountryService }  from './country.service';
import { LaboratoryTechniqueService }  from './laboratory-technique.service';
import { DropdownQuestion, QuestionBase, TextboxQuestion, TextareaQuestion, MultiselectQuestion, Country, AutocompleteQuestion }  from './models';

@Injectable()
export class QuestionService {  

  countryOptions = [];
  techniquesOptions =[];
  fieldOfInterestOptions = [];

  private userId: string;
  private entity;
  private firebaseList;

  private path = '/adverts';

  
  

  constructor(private countryService: CountryService, private laboratoryTechniqueService: LaboratoryTechniqueService, private fieldOfInterestService: FieldOfInterestService, private db: AngularFireDatabase, private auth: AuthService) {
    this.userId = this.auth.getCurrentUserUid();
    

    

    this.countryService.getCountry$()
      .flatMap(list => list)
      .subscribe((data: any) => {
        this.countryOptions.push(data)
      }
    )

    this.laboratoryTechniqueService.getlabTechnique$()
      .flatMap(list => list)
      .subscribe((data: any) => {
        this.techniquesOptions.push(data)
      }
    )

    this.fieldOfInterestService.getFieldOfInterest$()
      .flatMap(list => list)
      .subscribe((data: any) => {
        this.fieldOfInterestOptions.push(data)
      })
  }





  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
getPath(): string {
  return this.path;
}

getOwnProfile() {
  return this.getEntities({
    orderByChild: 'userId',
    equalTo: this.userId,
  })
    .map((entities) => {
      let [entity] = entities;
      this.entity = entity;
      return entity;
    })
  // .do(data => console.log('server data:', data))  // debug - fixme why do i get so many responses?
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
        order: 1
      }),

      new TextboxQuestion({
        key: 'lastName',
        label: 'Last name',        
        order: 1
      }),   

      new TextboxQuestion({
        key: 'emailAddress',        
        label: 'Email',
        type: 'email',        
        order: 2
      }),

      new AutocompleteQuestion({
        key: 'country',
        label: 'Country',
        options: this.countryOptions,
        order: 3
      }),      

      new TextareaQuestion({
        key: 'jobDesc',
        maxLength: '1500',        
        label: 'Job description',                
        order: 4
      }),      

      new MultiselectQuestion({
        key: 'techniques',
        label: 'Techniques',
        options: this.techniquesOptions,
        order: 5
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
        order: 6
      }),      
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}