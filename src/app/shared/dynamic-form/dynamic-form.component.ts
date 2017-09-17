import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { QuestionService } from './../question.service';
import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionControlService } from '../';
import { QuestionBase } from '../models';

@Component({
  selector: 'dynamic-form',
  template: `
  <div class="wideComponent">
  <form (ngSubmit)="onSubmit()" [formGroup]="form">
 
    <div *ngFor="let question of questions" class="">
      <df-question [question]="question" [form]="form"></df-question>
    </div>
    <br>
    <!--div class="">
      <button type="submit" [disabled]="!form.valid" class="btn btn-primary">Save</button>
    </div-->
  </form>
 
  <!--div *ngIf="payLoad" class="">
    <strong>Saved the following values</strong><br>{{payLoad}}
  </div-->
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
