import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DicerollerComponent } from './diceroller/diceroller.component';
import { InfoComponent } from './info/info.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // { path: '', component: AppComponent},
  { path: '', redirectTo: '/diceroller', pathMatch: 'full'},

  { path: 'diceroller', component: DicerollerComponent},
  { path: 'info', component: InfoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
