import { QuestionBase } from './question-base';

export class MultiselectQuestion extends QuestionBase<string> {  
  controlType = 'multi-select';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}