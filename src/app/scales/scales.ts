import { numToString, scalepatterns, generateScales } from '../utils/data';
import { QuestionGenerator } from '../models/questionGenerator';
import { Subject, Subscription } from 'rxjs';
import { PianoService } from '../piano/piano.service';

export class ScaleQuestionGenerator implements QuestionGenerator {
  public enabledQuestions = [];
  public question = '';
  public pageUpdateSource = new Subject<void>();

  public progress = '';

  private noteSubscription: Subscription;
  private sequence = [];

  private enableSharps = true;
  private enableNaturals = true;

  private enabledScaleModes = { Major: true, Minor: false };
  private scales = generateScales();

  constructor(pianoService: PianoService) {
    this.generateQuestions();
    this.noteSubscription = pianoService.noteSource.subscribe(note => {
      if (this.nextNote(note)) {
        this.nextQuestion();
      }
      this.progress = this.getProgressString();
      this.pageUpdateSource.next();
    });
  }
  public generateQuestions() {
    this.enabledQuestions = [];
    for (let root = 21; root < 33; root++) {
      const note = numToString(root, false);
      if ((note.length === 1 || this.enableSharps) && (note.length === 2 || this.enableNaturals)) {
        for (const pat of Object.keys(scalepatterns).filter(patt => this.enabledScaleModes[patt])) {
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
    this.noteSubscription.unsubscribe();
  }

  private nextNote(note: string) {
    this.sequence.push(note.slice(0, -1));
    let i;
    for (i = 0; i < this.sequence.length; i++) {
      if (this.scales[this.question][i] !== this.sequence[i]) {
        this.sequence = [];
      }
    }
    if (i === this.scales[this.question].length) {
      this.sequence = [];
      return true;
    }
  }
  public getProgressString() {
    let outstr = '';
    for (let i = 0; i < this.scales[this.question].length; i++) {
      if (i < this.sequence.length) {
        outstr += this.sequence[i] + ' ';
      } else {
        outstr += '● ';
      }
    }
    return outstr.slice(0, -1);
  }
}
