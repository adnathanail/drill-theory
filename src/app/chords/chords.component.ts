import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { PianoService } from '../piano/piano.service';
import { Subscription } from 'rxjs';
import { ChordQuestionGenerator } from './chords';
import { chordNames } from '../data';

@Component({
  selector: 'app-chords',
  templateUrl: './chords.component.html',
  styleUrls: ['./chords.component.scss'],
})
export class ChordsComponent implements OnInit, OnDestroy {
  public chordQuestionGenerator = new ChordQuestionGenerator();
  public chordNames = chordNames;

  private chordSubscription: Subscription;

  constructor(
    private ref: ChangeDetectorRef,
    private pianoService: PianoService
  ) {
    this.chordSubscription = this.pianoService.chordsSource.subscribe(
      chords => {
        if (this.chordQuestionGenerator.checkAnswer(chords)) {
          this.chordQuestionGenerator.nextQuestion();
        }
        this.ref.detectChanges();
      }
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.chordSubscription.unsubscribe();
  }
}
