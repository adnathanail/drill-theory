import {
  numToString,
  scalepatterns,
  generateScales,
  noteNames,
  chordpatterns,
  generateChords,
} from '../data';

function chordIntersection(c1, c2) {
  return c1.filter(value => -1 !== c2.indexOf(value));
}

export class ProgressionQuestionGenerator {
  private enableSharps = false;
  private enableNaturals = true;
  private enableScaleModes = { Ionian: true };
  private enableChords = {
    '': true,
    '7': true,
    maj7: false,
    m: true,
    m7: true,
    mmaj7: false,
    dim: false,
    dim7: false,
  };

  private enabledScaleNames = [];
  private scale: string = '';
  public progression = [];
  private scales = generateScales();
  private chords = generateChords();

  private sequence = [];
  public question = '';

  public generateScaleNames() {
    this.enabledScaleNames = [];
    for (let root = 21; root < 33; root++) {
      let note = numToString(root, false);
      if (
        (note.length == 1 || this.enableSharps) &&
        (note.length == 2 || this.enableNaturals)
      ) {
        for (let pat of Object.keys(scalepatterns).filter(
          pat => this.enableScaleModes[pat]
        )) {
          this.enabledScaleNames.push(note + ' ' + pat);
        }
      }
    }
    this.generateChords();
  }

  public generateChords() {
    this.scale =
      this.enabledScaleNames[
        Math.floor(Math.random() * this.enabledScaleNames.length)
      ];
    let enabledChordNames = [];
    for (let note of this.scales[this.scale].slice(0, -1)) {
      for (let pat of Object.keys(chordpatterns).filter(
        pat => this.enableChords[pat]
      )) {
        enabledChordNames.push(note + ' ' + pat);
      }
    }
    console.log(enabledChordNames);
    console.log('AA', this.chords);
    let rootChords = enabledChordNames.filter(
      chord => chord.split(' ')[0] == this.scale.split(' ')[0]
    );
    this.progression.push(
      rootChords[Math.floor(Math.random() * rootChords.length)]
    );
    let notLooping = true;
    while (notLooping) {
      while (this.progression.length < 4) {
        let potenantialNextChords = [];
        for (let cn of enabledChordNames) {
          let c1 = this.chords[this.progression[this.progression.length - 1]];
          let c2 = this.chords[cn];
          let intersection = chordIntersection(c1, c2);
          console.log(c1, c2, intersection);
          if (
            this.progression.filter(
              chord => chord.split(' ')[0] == cn.split(' ')[0]
            ).length == 0
          ) {
            for (let i = 0; i < intersection.length; i++) {
              potenantialNextChords.push(cn);
            }
          }
        }
        console.log('AAA', this.progression, potenantialNextChords);
        this.progression.push(
          potenantialNextChords[
            Math.floor(Math.random() * potenantialNextChords.length)
          ]
        );
      }
      console.log(
        'aaa',
        this.chords[this.progression[this.progression.length - 1]],
        this.chords[this.progression[0]]
      );
      if (
        chordIntersection(
          this.chords[this.progression[this.progression.length - 1]],
          this.chords[this.progression[0]]
        ).length > 1
      ) {
        notLooping = false;
      } else {
        this.progression = [this.progression[0]];
      }
    }

    console.log(this.progression);
    // this.nextQuestion();
  }

  constructor() {
    this.generateScaleNames();
  }

  public nextQuestion() {
    this.question =
      this.enabledScaleNames[
        Math.floor(Math.random() * this.enabledScaleNames.length)
      ];
    return this.question;
  }

  public nextNote(note: string) {
    this.sequence.push(note.slice(0, -1));
    let i;
    for (i = 0; i < this.sequence.length; i++) {
      if (this.scales[this.question][i] != this.sequence[i]) {
        this.sequence = [];
      }
    }
    if (i == this.scales[this.question].length) {
      this.sequence = [];
      return true;
    }
    console.log(this.sequence);
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
