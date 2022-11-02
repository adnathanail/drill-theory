import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { PianoService } from '../piano/piano.service';
import { Subscription } from 'rxjs';
import { ChordQuestionGenerator } from './chords';
import { chordNames } from '../utils/data';

@Component({
  selector: 'app-chords',
  templateUrl: './chords.component.html',
  styleUrls: ['./chords.component.scss'],
})
export class ChordsComponent implements OnInit, OnDestroy {
  public chordQuestionGenerator: ChordQuestionGenerator;
  public chordNames = chordNames;

  private chordQuestionSubscription: Subscription;

  constructor(
    private ref: ChangeDetectorRef, //
    private pianoService: PianoService
  ) {
    this.chordQuestionGenerator = new ChordQuestionGenerator(pianoService);
    this.chordQuestionSubscription = this.chordQuestionGenerator.pageUpdateSource.subscribe(() => {
      this.ref.detectChanges();
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.chordQuestionGenerator.destroy();
    this.chordQuestionSubscription.unsubscribe();
  }
}
