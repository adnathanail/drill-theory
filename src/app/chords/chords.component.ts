import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef} from '@angular/core';
import { PianoService } from '../piano.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chords',
  templateUrl: './chords.component.html',
  styleUrls: ['./chords.component.scss']
})
export class ChordsComponent implements OnInit {

  public noteNames = [];
  public notes = [];
  subscription: Subscription;
  public chord = "";
  private chords = {};
  public chordpatterns = {
    "": [0, 4, 7],
    "7": [0, 4, 7, 10],
    "maj7": [0, 4, 7, 11],
    "m": [0, 3, 7],
    "m7": [0, 3, 7, 10],
    "mmaj7": [0, 3, 7, 11],
  }
  private chordNames = {
    "": "Major",
    "7": "Dominant 7th",
    "maj7": "Major 7th",
    "m": "Minor",
    "m7": "Minor 7th",
    "mmaj7": "Minor major 7th",
  }
  private enabledChordTypes = {"": true, "7": false, "maj7": false, "m": true, "m7": false, "mmaj7": false,};
  private enableSharps = true;
  private enableNaturals = true;
  private enabledChordNames = [];
  private question = "";

  private generateChords() {
    for(let root = 21; root < 33; root++) {
      for(let pat of Object.keys(this.chordpatterns)) {
        this.chords[this.pianoService.numToString(root, false) + " " + pat]
         = this.chordpatterns[pat].map(nos => this.pianoService.numToString(root + nos, false)).sort(); // nos - noteoffset
      }
    }
  }

  private generatechordNames() {
    this.enabledChordNames = [];
    for(let root = 21; root < 33; root++) {
      let note = this.pianoService.numToString(root, false);
      if (
        (note.length == 1 || this.enableSharps) &&
        (note.length == 2 || this.enableNaturals)
      ) {
        for(let pat of Object.keys(this.chordpatterns).filter(pat => this.enabledChordTypes[pat])) {
          this.enabledChordNames.push(note + " " + pat);
        }
      }
    }
  }

  constructor(private ref: ChangeDetectorRef, private pianoService: PianoService) {
    this.generateChords();
    this.generatechordNames();
    for (let i of ["1","2","3","4","5","6","7","8"]) {
      for (let j of ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]){
        this.noteNames.push(j+i);
      }
    }
    this.subscription = this.pianoService.notesSource.subscribe(
      notes => {
        this.notes = this.noteNames.filter(key => notes[key]);
        console.log(this.notes);
        // Find chord and display it
        this.chord = this.detectChord();
        if (this.chord == this.question) {
          this.nextQuestion();
        }
        this.ref.detectChanges();
      }
    )
    this.nextQuestion();
  }

  private detectChord() {
    // List of notes current pressed without octave numbers
    var notes = this.notes.map(key => key.slice(0,-1)).sort();
    var uniqueNotes = Array.from(new Set(notes))
    // Find chord
    for (let chordName in this.chords) {
      if(arraysEqual(uniqueNotes, this.chords[chordName])) {
        return chordName
      }
    }
  }

  nextQuestion() {
    this.question = this.enabledChordNames[Math.floor(Math.random() * this.enabledChordNames.length)];
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}