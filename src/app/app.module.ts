import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PianoComponent } from './piano/piano.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChordsComponent } from './chords/chords.component';

@NgModule({
  declarations: [
    AppComponent,
    PianoComponent,
    ChordsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
