import { GroupedQuestionControlService } from './../grouped-question-control.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { QuestionService } from './../question.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../';
import { QuestionBase, GroupedQuestions } from '../models';

@Component({
  selector: 'app-dynamic-form-grouped',
  templateUrl: './dynamic-form-grouped.component.html',
  styleUrls: ['./dynamic-form-grouped.component.css']
})
export class DynamicFormGroupedComponent implements OnInit {
  @Input() groupedQuestions: GroupedQuestions<any>[] = [];
  @Input() path: string;
  @Input() entity;

  form: FormGroup;
  payLoad = '';
  hotEntity;

  constructor(private qcs: QuestionControlService) { }

  ngOnInit() {
    // this.form = this.qcs.toFormGroups(this.groupedQuestions);

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