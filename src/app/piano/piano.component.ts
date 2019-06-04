import { Component, OnInit } from '@angular/core';

import webmidi from 'webmidi';
import { Input } from 'webmidi';
import { ChangeDetectorRef} from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { PianoService } from './piano.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'piano-component',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss'],
  animations: [
    trigger('whiteKeyDownUp', [
      state('up', style({
        width: '50px',
        transform: 'translate(0px, 0px)',
        fill: 'white',
      })),
      state('down', style({
        width: '40px',
        transform: 'translate(5px, 0px)',
        fill: 'lightgrey',
      })),
      transition('up => down', [
        animate('0.1s'),
      ]),
      transition('down => up', [
        animate('0.2s'),
      ]),
    ]),
    trigger('blackKeyDownUp', [
      state('up', style({
        width: '30px',
        transform: 'translate(0px, 0px)',
        fill: 'black',
      })),
      state('down', style({
        width: '20px',
        transform: 'translate(5px, 0px)',
        fill: 'midnightblue',
      })),
      transition('up => down', [
        animate('0.1s'),
      ]),
      transition('down => up', [
        animate('0.2s'),
      ]),
    ])
  ]
})
export class PianoComponent implements OnInit {

  public notes = {};
  public chord = ".";
  public whites = [];
  public blacks = [];
  public inputs: Input[] = [];
  public MIDIInputName = "MPK Mini Mk II";
  notesSubscription: Subscription;
  chordSubscription: Subscription;

  constructor(private ref: ChangeDetectorRef, private pianoService: PianoService) {
    for (let i of ["1","2","3","4","5","6","7","8"]) {
      for (let j of ["C","D","E","F","G","A","B"]){
        this.whites.push(j+i);
      }
      for (let j of ["C#", "D#", "F#", "G#", "A#"]) {
        this.blacks.push(j+i);
        if (["D#","A#"].includes(j)) {
          this.blacks.push("");
        }
      }
    }
    this.notesSubscription = this.pianoService.notesSource.subscribe(
      notes => {
        this.notes = notes;
      }
    )
    this.chordSubscription = this.pianoService.chordSource.subscribe(
      chord => {
        // console.log(chord);
        if (chord != "") {
          this.chord = chord;
        } else {
          this.chord = ".";
        }
      }
    )
  }
  ngOnInit() {
    var WebMidi = webmidi;
    var that = this;
    WebMidi.enable(function (err) {
      console.log(err);
      that.inputs = WebMidi.inputs;
      that.changeInput();
    });
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.notesSubscription.unsubscribe();
    this.chordSubscription.unsubscribe();
  }
  range(n: number): number[] {
    return Array.from(Array(n).keys());
  }
  changeInput() {
    var WebMidi = webmidi;
    for (let inp of this.inputs) {
      inp.removeListener();
    }
    console.log(this.MIDIInputName);
    var input = WebMidi.getInputByName(this.MIDIInputName);
    if (input) {
      let that = this;
      input.addListener('noteon', "all", function(e) {
        that.pianoService.updateNote(e.note.name + e.note.octave, true);
        that.ref.detectChanges();
      });
      input.addListener('noteoff', "all", function(e) {
        that.pianoService.updateNote(e.note.name + e.note.octave, false);
        that.ref.detectChanges();
      });
    }
  }
}
