import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { enharmonicNotes, generateChords, noteNames, octaves } from '../utils/data';
import { arraysEqual } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class PianoService {
  private notes = {};
  private activeNotes = [];
  private chords = generateChords();

  notesSource = new Subject<object>();
  noteSource = new Subject<string>();
  chordsSource = new Subject<string[]>();

  constructor() {
    for (const i of octaves) {
      for (const j of noteNames) {
        this.notes[j + i] = false;
      }
    }
  }
  private detectChord() {
    // List of notes current pressed without octave numbers
    const notes = this.activeNotes.map(note => note.slice(0, -1)).sort();
    const uniqueNotes = Array.from(new Set(notes));
    // Find chord
    const chords: string[] = [];
    for (const chordName in this.chords) {
      if (arraysEqual(uniqueNotes, this.chords[chordName])) {
        chords.push(chordName);
        const splitChord = chordName.split(' ');
        if (splitChord[0] in enharmonicNotes) {
          chords.push(enharmonicNotes[splitChord[0]] + ' ' + splitChord[1]);
        }
      }
    }
    return chords;
  }

  updateNote(note: string, value: boolean) {
    if (value) {
      this.noteSource.next(note);
    }

    this.notes[note] = value;
    this.notesSource.next(this.notes);

    this.activeNotes = Object.keys(this.notes).filter(key => this.notes[key]);
    this.chordsSource.next(this.detectChord());
  }
}
