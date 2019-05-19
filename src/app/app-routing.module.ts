import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChordsComponent } from './chords/chords.component';

const routes: Routes = [
  { path: '', component: ChordsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
