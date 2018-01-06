import { QuestionBase } from './question-base';
export class GroupedQuestions<T> {
  questions: QuestionBase<T>[];
  order?: number
}