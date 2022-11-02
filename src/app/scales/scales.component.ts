import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { PianoService } from '../piano/piano.service';
import { Subscription } from 'rxjs';
import { ScaleQuestionGenerator } from './scales';

@Component({
  selector: 'app-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.scss'],
})
export class ScalesComponent implements OnInit {
  private scaleQuestionGenerator = new ScaleQuestionGenerator();

  noteSubscription: Subscription;
  public question = '';
  public progress = '';

  constructor(
    private ref: ChangeDetectorRef, //
    private pianoService: PianoService
  ) {
    this.noteSubscription = this.pianoService.noteSource.subscribe(note => {
      if (this.scaleQuestionGenerator.nextNote(note)) {
        this.question = this.scaleQuestionGenerator.nextQuestion();
      }
      this.progress = this.scaleQuestionGenerator.getProgressString();
      this.ref.detectChanges();
    });
    this.question = this.scaleQuestionGenerator.nextQuestion();
    this.progress = this.scaleQuestionGenerator.getProgressString();
  }

  ngOnInit() {}

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.noteSubscription.unsubscribe();
  }
}
