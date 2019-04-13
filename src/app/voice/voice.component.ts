import { Component, OnInit } from '@angular/core';
import Speech from 'speak-tts';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss']
})
export class VoiceComponent implements OnInit {
  speech = new Speech();

  constructor() { }

  ngOnInit() {
    if (this.speech.hasBrowserSupport()) {
      this.speech.init().then((data) => {
        console.log("Speech is ready, voices are available", data);
      });
    }
  }

  speak() {
    this.speech.speak({
      text: 'Cześć Mikołaj, jak się masz?'
    }).then(() => {
      console.log('Success!');
    }).catch(e => {
      console.error('An error occurred :', e);
    });
  }
}
