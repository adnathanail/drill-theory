import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { octaves, noteNames, generateChords } from '../data';

@Injectable({
  providedIn: 'root'
})
export class PianoService {
  private notes = {};
  private activeNotes = [];
  private chords = generateChords();

  notesSource = new Subject<Object>();
  noteSource = new Subject<string>();
  chordSource = new Subject<string>();

  constructor() {
    for (let i of octaves) {
      for (let j of noteNames){
        this.notes[j+i] = false;
      }
    }
  }
  private detectChord() {
    // List of notes current pressed without octave numbers
    var notes = this.activeNotes.map(note => note.slice(0,-1)).sort();
    var uniqueNotes = Array.from(new Set(notes))
    // Find chord
    for (let chordName in this.chords) {
      if(arraysEqual(uniqueNotes, this.chords[chordName])) {
        return chordName
      }
    }
    return "";
  }

  updateNote(note: string, value: boolean) {
    if(value) {
      this.noteSource.next(note);
    }

    this.notes[note] = value;
    this.notesSource.next(this.notes);

    this.activeNotes = Object.keys(this.notes).filter(key => this.notes[key]);
    this.chordSource.next(this.detectChord());
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