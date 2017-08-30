import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase, QuestionControlService } from '../';

@Component({
  selector: 'dynamic-form',
  template: `
  <div class="wideComponent">
  <form (ngSubmit)="onSubmit()" [formGroup]="form">
 
    <div *ngFor="let question of questions" class="">
      <df-question [question]="question" [form]="form"></df-question>
    </div>
 
    <div class="">
      <button type="submit" [disabled]="!form.valid">Save</button>
    </div>
  </form>
 
  <div *ngIf="payLoad" class="">
    <strong>Saved the following values</strong><br>{{payLoad}}
  </div>
</div>    
`,
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);    
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
