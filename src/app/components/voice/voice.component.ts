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
  voiceStarted = false;
  voicePaused = false;
  fromValue: string;
  toValue: string;
  pdfFile: File;
  pdfText: string;

  constructor(
    private pdfService: PdfService
  ) { }

  ngOnInit() {
    if (this.speech.hasBrowserSupport()) {
      this.speech.init({
        voice: CONSTANTS.VOICE
      }).catch(
        () => this.setAppleVoice()
      );
    }
  }

  setAppleVoice() {
    this.speech.init({
      rate: 0.85
    });
  }

  fileSelected(event) {
		if (event.target.files[0] != null) {
      this.pdfFile = event.target.files[0];
      this.sendData(event.target.files[0]);
		}
  }

  sendData(pdfFile: File) {
    let pdfInfo = new FormData();
    
    pdfInfo.append('from', this.fromValue);
    pdfInfo.append('to', this.toValue);
    pdfInfo.append('pdfFile', pdfFile, pdfFile.name);

    this.pdfService.getText(pdfInfo).subscribe(
      text => this.pdfText = text,
      () => this.pdfText = 'Coś poszło nie tak.'
    );
  }

  rangeChange() {
    if (this.pdfFile != null) {
      this.pdfText = null;
    }
  }

  speak() {
    if (this.voiceStarted) {
      if (this.voicePaused) {
        this.speech.resume();
        this.voicePaused = false;
      } else {
        this.speech.pause();
        this.voicePaused = true;
      }
    } else {
      this.speech.speak({
        text: this.pdfText
      });
      this.voiceStarted = true;
    }
  }

  reload() {
    this.speech.cancel();
    this.voiceStarted = false;
    this.voicePaused = false;
    this.sendData(this.pdfFile);
  }
}
