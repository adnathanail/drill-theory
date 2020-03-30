import { numToString } from '../data';
import { chordpatterns } from '../data';

export class ChordQuestionGenerator {
  private enableSharps = false
  private enableNaturals = true
  private enableChords = {"": false, "7": false, "maj7": false, "m": false, "m7": false, "mmaj7": false, "dim": false, "dim7": true,};

  private enabledChordNames = [];
  public question = "";

  public generateChordNames() {
    this.enabledChordNames = [];
    for(let root = 21; root < 33; root++) {
      let note = numToString(root, false);
      if (
        (note.length == 1 || this.enableSharps) &&
        (note.length == 2 || this.enableNaturals)
      ) {
        for(let pat of Object.keys(chordpatterns).filter(pat => this.enableChords[pat])) {
          this.enabledChordNames.push(note + " " + pat);
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
      return true
    }
    return false
  }
}