import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PianoComponent } from './piano/piano.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChordsComponent } from './chords/chords.component';
import { ScalesComponent } from './scales/scales.component';
import { ProgressionsComponent } from './progressions/progressions.component';

@NgModule({
  declarations: [
    AppComponent,
    PianoComponent,
    ChordsComponent,
    ScalesComponent,
    ProgressionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    MatButtonModule, MatCheckboxModule, MatSelectModule, MatOptionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
