import { AuthenticationService } from './authentication.service';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from './models/question-base';

@Injectable()
export class QuestionControlService {
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
    
    if (this.userId){
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

  toFormGroup(questions: QuestionBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}