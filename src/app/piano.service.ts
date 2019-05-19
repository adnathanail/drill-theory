import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PianoService {

  private notes = {};
  notesSource = new Subject<Object>();

  updateNote(note: string, value: boolean) {
    this.notes[note] = value;
    this.notesSource.next(this.notes);
  }

  constructor() {
    for (let i of ["1","2","3","4","5","6","7","8"]) {
      for (let j of ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]){
        this.notes[j+i] = false;
      }
    }
  }

  private noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  public stringToNum(note: string) {
    var sym = "";
    var oct = 0;
    if (note.length == 2) {
      sym = note[0];
      oct = parseInt(note[1]);
    } else {
      sym = note.slice(0,2);
      oct = parseInt(note[2]);
    }
    // Find the corresponding note in the array.
    return oct*12 + this.noteNames.indexOf(sym);
  }
  public numToString(note: number, octave = true) {
    var oct = (Math.floor(note/12) - 1).toString();
    var sym = this.noteNames[note % 12];
    if(octave) {
      return sym + oct;
    } else {
      return sym
    }
  }
}
