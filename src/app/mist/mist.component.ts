import { Component, OnInit } from '@angular/core';

import { mistIntro } from '../shared';

@Component({
  selector: 'app-mist',
  templateUrl: './mist.component.html',
  styleUrls: ['./mist.component.css']
})
export class MistComponent implements OnInit {
  private greetings: string = '';
  private overrideGreetings: string = '';
  constructor() { }

  ngOnInit() {
    // this.greetings = mistIntro;
    this.overrideGreetings ? this.greetings = this.overrideGreetings : this.greetings =  mistIntro;    
    // if (Math.random() < 0.5) {
    this.enterAltruvation();
    // }
  }

  enterAltruvation() {
    let text: HTMLElement = document.getElementById('mist-text');
    let video = <HTMLVideoElement>document.getElementById('mist-video');
    let audio = <HTMLAudioElement>document.getElementById('mist-audio');
    video.style.display = 'none';
    video.pause();
    text.style.display = 'none';
    audio.pause();
  }

    enterTheAbyss(msg?: string) {
    let text: HTMLElement = document.getElementById('mist-text');
    let video = <HTMLVideoElement>document.getElementById('mist-video');
    let audio = <HTMLAudioElement>document.getElementById('mist-audio');
    video.style.display = 'block';
    video.play();
    text.style.display = 'block';
    audio.play();
  }

}
