import { numToString, scalepatterns, generateScales } from '../data';

export class ScaleQuestionGenerator {
  private enableSharps = true;
  private enableNaturals = true;

  private enabledScaleModes = { Major: true, Minor: true };
  private enabledScaleNames = [];
  private scales = generateScales();

  private sequence = [];
  public question = '';

  public generateChordNames() {
    this.enabledScaleNames = [];
    for (let root = 21; root < 33; root++) {
      const note = numToString(root, false);
      if ((note.length === 1 || this.enableSharps) && (note.length === 2 || this.enableNaturals)) {
        for (const pat of Object.keys(scalepatterns).filter(patt => this.enabledScaleModes[patt])) {
          this.enabledScaleNames.push(note + ' ' + pat);
        }
      }
    }
  }

  constructor() {
    this.generateChordNames();
    this.nextQuestion();
    console.log(this.scales);
  }

  public nextQuestion() {
    this.question = this.enabledScaleNames[Math.floor(Math.random() * this.enabledScaleNames.length)];
    return this.question;
  }

  public nextNote(note: string) {
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
