import { AuthenticationService } from './authentication.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase, GroupedQuestions } from './models';

@Injectable()
export class GroupedQuestionControlService {
  private userId: string;

  constructor(private db: AngularFireDatabase, private authenticationService: AuthenticationService) {
    this.userId = this.authenticationService.getUserId();
  }

  private creationHandler(path, data) {
    let result = data;
    if (path === '/labs') {
      result.members = { [this.userId]: true }
    }
    return result;
  }
  private create(path, data) {

    if (this.userId) {
      let result = this.creationHandler(path, data);
      result.userId = this.userId;
      console.log(result)
      this.db.list(path).push(result);
    }
  }

  private update(path, key, data) {
    this.db.list(path).update(key, data);
  }

  upsert(path, data, entity?) {
    if (entity) {
      this.update(path, entity.$key, data);
    } else {
      this.create(path, data);
    }
  }

  toFormGroups(groupedQuestions: GroupedQuestions<any>[]): FormGroup[] {
    let formGroups: FormGroup[] = [];
    groupedQuestions.forEach(questionGroup => {
      let formGroup: any = {};
      questionGroup.questions.forEach(question => {
        formGroup[question.key] = question.required ? new FormControl(question.value || '', Validators.required): new FormControl(question.value || '');
        formGroups.push(new FormGroup(formGroup));
      });
    })

    return formGroups;
  }
}