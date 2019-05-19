import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PianoComponent } from './piano/piano.component';

const routes: Routes = [
  { path: '', component: PianoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
