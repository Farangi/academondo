import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { QuestionService } from './../question.service';
import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionControlService } from '../';
import { QuestionBase } from '../models';

@Component({
  selector: 'dynamic-form',
  template: 
`<div>
  <form [formGroup]="form"> 
    <md-vertical-stepper>
      <md-step>
        Everything gets saved on the fly, enjoy!
        <div>
          <button md-raised-button color="primary" mdStepperNext>Begin</button>
        </div>
      </md-step>    
      <div *ngFor="let question of questions">
      <md-step [label]="question.label">
        <df-question [question]="question" [form]="form"></df-question>
        <div>
          <button md-raised-button color="primary" mdStepperPrevious>Back</button>
          <button md-raised-button color="primary" mdStepperNext>Next</button>
        </div>
      </md-step>
      </div>
      <md-step label="Confirm your information">
        Everything seems correct, feel free to edit anytime :-)
        <div>
          <button md-raised-button color="primary" mdStepperPrevious>Back</button>
        </div>
      </md-step>
    </md-vertical-stepper>
  </form>
</div>    
`,
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  @Input() path: string;
  @Input() entity;

  form: FormGroup;
  payLoad = '';
  hotEntity;

  constructor(private qcs: QuestionControlService) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);

    this.entity.subscribe(entity => {      
      if (entity) {
        this.hotEntity = entity;
        this.form.patchValue(entity);
      }
    });    

    this.form.valueChanges
      .debounceTime(500)
      .subscribe(value => {
        if (this.form.status !== 'VALID') {
          return;
        }        
        this.qcs.upsert(this.path, value, this.hotEntity);
      });
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
