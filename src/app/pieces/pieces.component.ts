import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PianoService } from '../piano/piano.service';
import { PieceQuestionGenerator } from './pieces';

@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.scss'],
})
export class PiecesComponent implements OnInit, OnDestroy {
  public pieceQuestionGenerator = new PieceQuestionGenerator();

  private chordSubscription: Subscription;

  constructor(
    private ref: ChangeDetectorRef,
    private pianoService: PianoService
  ) {
    this.chordSubscription = this.pianoService.chordsSource.subscribe(
      chords => {
        if (this.pieceQuestionGenerator.checkAnswer(chords)) {
          this.pieceQuestionGenerator.nextQuestion();
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
