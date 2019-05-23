import { PianoService } from '../piano/piano.service';
import { numToString } from '../data';
import { Subscription } from 'rxjs';
import { chordpatterns } from '../data';

export class ChordQuestionGenerator {
  chordSubscription: Subscription;

  private enableSharps = true
  private enableNaturals = true

  private enabledChordNames = [];
  private enabledChordTypes = {"": true, "7": false, "maj7": false, "m": true, "m7": false, "mmaj7": false, "dim": false, "dim7": false,};

  private question = "";

  private generateChordNames() {
    this.enabledChordNames = [];
    for(let root = 21; root < 33; root++) {
      let note = numToString(root, false);
      if (
        (note.length == 1 || this.enableSharps) &&
        (note.length == 2 || this.enableNaturals)
      ) {
        for(let pat of Object.keys(chordpatterns).filter(pat => this.enabledChordTypes[pat])) {
          this.enabledChordNames.push(note + " " + pat);
        }
      }
    }
  }
  
  constructor() {
    this.generateChordNames();
    this.nextQuestion();
  }

  public nextQuestion() {
    this.question = this.enabledChordNames[Math.floor(Math.random() * this.enabledChordNames.length)];
  }

  public checkAnswer(chord: string) {
    if (chord == this.question) {
      return true
    }
    return false
  }
}