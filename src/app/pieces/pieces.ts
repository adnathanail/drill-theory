import { numToString } from '../data';
import { chordpatterns } from '../data';

export class PieceQuestionGenerator {
  public chords = [
    'Bb 7',
    'Eb 7',
    'Bb 7',
    'F m7',
    'Bb 7',
    //
    'Eb 7',
    'Eb 7',
    'Bb 7',
    'D dim',
    'G 7',
    //
    'C m7',
    'F 7',
    'D m7',
    'G 7',
    'C m7',
    'F 7',
  ];
  private currentQuestionIndex = 0;
  public question = '';

  constructor() {
    this.nextQuestion();
  }

  public nextQuestion() {
    this.question = this.chords[this.currentQuestionIndex];
    this.currentQuestionIndex += 1;
    if (this.currentQuestionIndex >= this.chords.length) {
      this.currentQuestionIndex = 0;
    }
    return this.question;
  }

  public checkAnswer(chords: string[]) {
    return chords.includes(this.question);
  }
}
