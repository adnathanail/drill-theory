import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { PianoService } from '../piano/piano.service';
import { Subscription } from 'rxjs';
import { ScaleQuestionGenerator } from './scales';

@Component({
  selector: 'app-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.scss'],
})
export class ScalesComponent implements OnInit, OnDestroy {
  public scaleQuestionGenerator: ScaleQuestionGenerator;

  private scaleQuestionSubscription: Subscription;

  constructor(
    private ref: ChangeDetectorRef, //
    private pianoService: PianoService
  ) {
    this.scaleQuestionGenerator = new ScaleQuestionGenerator(pianoService);
    this.scaleQuestionSubscription = this.scaleQuestionGenerator.pageUpdateSource.subscribe(() => {
      this.ref.detectChanges();
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.scaleQuestionGenerator.destroy();
    this.scaleQuestionSubscription.unsubscribe();
  }
}
