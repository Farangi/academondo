export class QuestionBase<T>{
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    group: number;
    controlType: string;
  
    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        group?: number,
        controlType?: string
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.group = options.group === undefined ? 1 : options.group;
      this.controlType = options.controlType || '';      
    }
  }