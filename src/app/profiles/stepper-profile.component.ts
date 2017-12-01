import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper-profile',
  templateUrl: './stepper-profile.component.html',
  styleUrls: ['./stepper-profile.component.css']
})
export class StepperProfileComponent implements OnInit {

  text;
  step = 0;
  constructor() { }

  ngOnInit() {
  }

  handleTextUpdated(text) {
    this.text = text
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }  

}
