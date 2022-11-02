import { numToString } from '../utils/data';
import { chordpatterns } from '../utils/data';

export class ChordQuestionGenerator {
  public enableSharps = false;
  public enableNaturals = true;
  public enableChords = {
    '': false,
    7: false,
    maj7: false,
    m: false,
    m7: false,
    mmaj7: false,
    dim: false,
    dim7: true,
  };

  public enabledChordNames = [];
  public question = '';

  public generateChordNames() {
    this.enabledChordNames = [];
    for (let root = 21; root < 33; root++) {
      const note = numToString(root, false);
      if ((note.length === 1 || this.enableSharps) && (note.length === 2 || this.enableNaturals)) {
        for (const pat of Object.keys(chordpatterns).filter(patt => this.enableChords[patt])) {
          this.enabledChordNames.push(note + ' ' + pat);
        }
      }
    }
    console.log(this.enabledChordNames);
    this.nextQuestion();
  }

  constructor() {
    this.generateChordNames();
  }

  public nextQuestion() {
    this.question = this.enabledChordNames[Math.floor(Math.random() * this.enabledChordNames.length)];
    return this.question;
  }

  public checkAnswer(chords: string[]) {
    if (chords.includes(this.question)) {
      return true;
    }
    return false;
  }
}
