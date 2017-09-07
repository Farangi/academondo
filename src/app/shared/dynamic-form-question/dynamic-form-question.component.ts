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
  templateUrl: './md-template.html'
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


