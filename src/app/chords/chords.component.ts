import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef} from '@angular/core';
import { PianoService } from '../piano/piano.service';
import { Subscription } from 'rxjs';
import { ChordQuestionGenerator } from './chords';

@Component({
  selector: 'app-chords',
  templateUrl: './chords.component.html',
  styleUrls: ['./chords.component.scss']
})
export class ChordsComponent implements OnInit {

  private chordQuestionGenerator = new ChordQuestionGenerator();

  chordSubscription: Subscription;
  private question = "";

  constructor(private ref: ChangeDetectorRef, private pianoService: PianoService) {
    this.chordSubscription = this.pianoService.chordSource.subscribe(
      chord => {
        if (this.chordQuestionGenerator.checkAnswer(chord)) {
          this.question = this.chordQuestionGenerator.nextQuestion();
        }
        this.ref.detectChanges();
      }
    )
    this.question = this.chordQuestionGenerator.nextQuestion();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.chordSubscription.unsubscribe();
  }
}