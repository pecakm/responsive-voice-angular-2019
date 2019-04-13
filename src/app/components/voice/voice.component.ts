import { Component, OnInit } from '@angular/core';
import Speech from 'speak-tts';

import { PdfService } from 'src/app/services/pdf/pdf.service';
import { CONSTANTS } from 'src/app/helpers/constants';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss']
})
export class VoiceComponent implements OnInit {
  speech = new Speech();
  pdfText: string;

  constructor(
    private pdfService: PdfService
  ) { }

  ngOnInit() {
    if (this.speech.hasBrowserSupport()) {
      this.speech.init({
        voice: CONSTANTS.VOICE
      }).then(
        () => this.getText()
      ).catch(
        () => this.setAppleVoice()
      );
    }
  }

  setAppleVoice() {
    this.speech.init({
      rate: 0.85
    }).then(
      () => this.getText()
    );
  }

  speak() {
    this.speech.speak({
      text: this.pdfText
    });
  }

  getText() {
    this.pdfService.getText().subscribe(
      text => this.pdfText = text,
      () => this.pdfText = 'Coś poszło nie tak.'
    );
  }
}
