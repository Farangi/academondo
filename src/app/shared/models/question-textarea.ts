import { QuestionBase } from './question-base';

export class TextareaQuestion extends QuestionBase<string> {
  controlType = 'textarea';
  type: string;
  maxLength: string;
  hint: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.maxLength = options['maxLength'] || '';
    this.hint = options['hint'] || '';
  }
}