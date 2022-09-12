import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChordsComponent } from './chords/chords.component';
import { ScalesComponent } from './scales/scales.component';
import { ProgressionsComponent } from './progressions/progressions.component';
import { PiecesComponent } from './pieces/pieces.component';

const routes: Routes = [
  { path: '', redirectTo: '/chords', pathMatch: 'full' },
  { path: 'chords', component: ChordsComponent },
  { path: 'scales', component: ScalesComponent },
  { path: 'progressions', component: ProgressionsComponent },
  { path: 'pieces', component: PiecesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
