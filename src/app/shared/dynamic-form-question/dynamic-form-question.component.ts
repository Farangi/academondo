import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { QuestionBase }     from '../models';

@Component({
  selector: 'df-question',
  styles: [`
    md-input-container textarea {
      resize: none;    
    }
  `],
  template: `
  <div [formGroup]="form">
  <!--label [attr.for]="question.key">{{question.label}}</label-->

  <div [ngSwitch]="question.controlType">

    <md-input-container *ngSwitchCase="'textbox'">
      <input mdInput  
        [formControlName]="question.key"
        [id]="question.key" [type]="question.type"
        placeholder="{{question.label}}"
      >
    </md-input-container>
    
    <md-input-container *ngSwitchCase="'textarea'">
      <textarea #message mdInput md-autosize 
        [formControlName]="question.key"
        [id]="question.key" [type]="question.type"
        placeholder="{{question.label}}">
      </textarea>
      <md-hint align="start"><strong> {{ question.hint }} </strong> </md-hint>
      <md-hint *ngIf="question.maxLength" align="end">{{message.value?.length}} / {{question.maxLength}}</md-hint>    
    </md-input-container>

    <select [id]="question.key" *ngSwitchCase="'dropdown'" [formControlName]="question.key">
      <option *ngFor="let opt of question.options" [value]="opt.name">{{opt.name}}</option>
    </select>

    <div *ngSwitchCase="'multi'">          
      <md-input-container>
        <input mdInput placeholder="{{question.label}}" [mdAutocomplete]="auto" [formControlName]="question.key">
      </md-input-container>          
      {{question.options}}
      <md-autocomplete #auto="mdAutocomplete">
        <md-option *ngFor="let opt of question.options " [value]="opt.name">
          {{ opt.name }}
        </md-option>        
        
      </md-autocomplete>      
    </div>

    <div *ngSwitchCase="'autocomplete'">          
    <md-input-container>
      <input mdInput placeholder="{{question.label}}" [mdAutocomplete]="auto" [formControlName]="question.key">
    </md-input-container>          
    {{question.options}}
    <md-autocomplete #auto="mdAutocomplete">
      <md-option *ngFor="let opt of question.options " [value]="opt.name">
        {{ opt.name }}
      </md-option>        
      
    </md-autocomplete>      
  </div>    

  </div> 
  <div class="errorMessage" *ngIf="showErrorMsg">{{question.label}} is required</div>  
</div>

  `
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  private get isValid() {    
    return this.form.controls[this.question.key].valid; 
  }

  private get isUntouched() {    
    return this.form.controls[this.question.key].untouched; 
  }

  get showErrorMsg() {
    return !this.isUntouched && !this.isValid;
  }
}


