import { numToString } from '../utils/data';
import { chordpatterns } from '../utils/data';
import { QuestionGenerator } from '../models/questionGenerator';
import { PianoService } from '../piano/piano.service';
import { Subject, Subscription } from 'rxjs';

export class ChordQuestionGenerator implements QuestionGenerator {
  public enabledQuestions = [];
  public question = '';
  public pageUpdateSource = new Subject<void>();

  private chordSubscription: Subscription;

  public enableSharps = false;
  public enableNaturals = true;
  public enableChords = {
    '': true,
    7: false,
    maj7: false,
    m: false,
    m7: false,
    mmaj7: false,
    dim: false,
    dim7: false,
  };

  constructor(pianoService: PianoService) {
    this.generateQuestions();
    this.chordSubscription = pianoService.chordsSource.subscribe(chords => {
      if (this.checkAnswer(chords)) {
        this.nextQuestion();
      }
    });
  }

  public generateQuestions() {
    this.enabledQuestions = [];
    for (let root = 21; root < 33; root++) {
      const note = numToString(root, false);
      if ((note.length === 1 || this.enableSharps) && (note.length === 2 || this.enableNaturals)) {
        for (const pat of Object.keys(chordpatterns).filter(patt => this.enableChords[patt])) {
          this.enabledQuestions.push(note + ' ' + pat);
        }
      }
    }
    this.nextQuestion();
  }
  public nextQuestion() {
    this.question = this.enabledQuestions[Math.floor(Math.random() * this.enabledQuestions.length)];
    this.pageUpdateSource.next();
  }
  public destroy() {
    this.chordSubscription.unsubscribe();
  }

  private checkAnswer(chords: string[]) {
    return chords.includes(this.question);
  }
}
