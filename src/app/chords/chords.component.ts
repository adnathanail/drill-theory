import { Component, OnInit } from '@angular/core';

import webmidi from 'webmidi';
import {ChangeDetectorRef} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';


@Component({
  selector: 'app-chords',
  templateUrl: './chords.component.html',
  styleUrls: ['./chords.component.scss'],
  animations: [
    trigger('whiteKeyDownUp', [
      state('up', style({
        width: '50px',
        transform: 'translate(0px, 0px)',
      })),
      state('down', style({
        width: '40px',
        transform: 'translate(5px, 0px)',
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
      })),
      state('down', style({
        width: '20px',
        transform: 'translate(5px, 0px)',
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
export class ChordsComponent implements OnInit {

  public notes = {};
  public whites = [];
  public blacks = []

  constructor(private ref: ChangeDetectorRef) {
    for (let i of ["1","2","3","4","5","6","7","8"]) {
      for (let j of ["C","D","E","F","G","A","B"]){
        this.notes[j+i] = false;
        this.whites.push(j+i);
      }
      for (let j of ["C#", "D#", "F#", "G#", "A#"]) {
        this.notes[j+i] = false;
        this.blacks.push(j+i);
        if (["D#","A#"].includes(j)) {
          this.blacks.push("");
        }
      }
    }
  }

  ngOnInit() {
    var WebMidi = webmidi;
    var that = this;
    WebMidi.enable(function (err) {
      console.log(err);
      var output = WebMidi.outputs[0];
      output.playNote("C3");
      console.log(WebMidi.inputs);
      var input = WebMidi.getInputByName("MidiKeys");
      if (input) {
        input.addListener('noteon', "all", function(e) {
          that.notes[e.note.name + e.note.octave] = true;
          that.ref.detectChanges();
        });
        input.addListener('noteoff', "all", function(e) {
          that.notes[e.note.name + e.note.octave] = false;
          that.ref.detectChanges();
        });
      }
    });
  }
  range(n: number): number[] {
    return Array.from(Array(n).keys());
  }
}
