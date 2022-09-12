import { Component, OnInit } from '@angular/core';
import { ProgressionQuestionGenerator } from './progressions';
import { ChangeDetectorRef } from '@angular/core';
import { PianoService } from '../piano/piano.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progressions',
  templateUrl: './progressions.component.html',
  styleUrls: ['./progressions.component.scss'],
})
export class ProgressionsComponent implements OnInit {
  public progressionQuestionGenerator = new ProgressionQuestionGenerator();

  noteSubscription: Subscription;
  public question = '';
  public progress = '';

  constructor(
    private ref: ChangeDetectorRef,
    private pianoService: PianoService
  ) {
    this.noteSubscription = this.pianoService.noteSource.subscribe(note => {
      if (this.progressionQuestionGenerator.nextNote(note)) {
        this.question = this.progressionQuestionGenerator.nextQuestion();
      }
      this.progress = this.progressionQuestionGenerator.getProgressString();
      this.ref.detectChanges();
    });
    this.question = this.progressionQuestionGenerator.nextQuestion();
    this.progress = this.progressionQuestionGenerator.getProgressString();
  }

  ngOnInit() {}

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.noteSubscription.unsubscribe();
  }
}
