import { Injectable }       from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { DropdownQuestion, QuestionBase, TextboxQuestion, TextareaQuestion, MultiselectQuestion, CountryService, Country, LaboratoryTechniqueService, AutocompleteQuestion }  from './';

@Injectable()
export class QuestionService {  
  
  countryOptions = [];
  techniqueOptions =[];

  constructor(private countryService: CountryService, private laboratoryTechniqueService: LaboratoryTechniqueService) {

    this.countryService.getCountry$()
      .flatMap(list => list)
      .subscribe((data: any) => {
        this.countryOptions.push(data)
      }
    )

    this.laboratoryTechniqueService.getlabTechnique$()
      .flatMap(list => list)
      .subscribe((data: any) => {
        this.techniqueOptions.push(data)
      }
    )      
  }

  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getQuestions() {

    let questions: QuestionBase<any>[] = [

      // new DropdownQuestion({
      //   key: 'brave',
      //   label: 'Bravery Rating',
      //   options: [
      //     {key: 'solid',  value: 'Solid'},
      //     {key: 'great',  value: 'Great'},
      //     {key: 'good',   value: 'Good'},
      //     {key: 'unproven', value: 'Unproven'}
      //   ],
      //   order: 3
      // }),

      new TextboxQuestion({
        key: 'firstName',              
        label: 'First name',
        value: 'Simon',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'emailAddress',        
        label: 'Email',
        type: 'email',
        value: 'agerskov@academondo.com',
        order: 2
      }),

      new TextareaQuestion({
        key: 'about',
        maxLength: '500',        
        label: 'About',
        value: '',
        required: true,
        order: 5
      }),      

      new MultiselectQuestion({
        key: 'country',        
        label: 'Country',
        options: this.countryOptions,
        order: 4
      }),

      new MultiselectQuestion({
        key: 'techiques',        
        label: 'Lab Techniques',
        required: true,
        options: this.techniqueOptions,
        order: 6
      }),

      new AutocompleteQuestion({
        key: 'techiques2',        
        label: 'Lab Techniques auto complete',
        required: true,
        options: this.techniqueOptions,
        order: 7
      })      
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}