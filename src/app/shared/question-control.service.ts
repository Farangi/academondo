import { AuthService } from './auth.service';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './models/question-base';

@Injectable()
export class QuestionControlService {
  private userId: string;

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.userId = this.auth.getCurrentUserUid();
   }

  private create(path, data) {
    data.userId = this.userId;
    this.db.list(path).push(data);
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

  toFormGroup(questions: QuestionBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}