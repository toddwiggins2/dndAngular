import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
// import {FormControl} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DicerollerComponent } from './diceroller/diceroller.component';
import { InfoComponent } from './info/info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule } from '@angular/material/button';
// import {MatSelectModule} from '@angular/material/select';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {DemoMaterialModule} from './material-module';
import { NavagationbarComponent } from './navagationbar/navagationbar.component';


@NgModule({
  declarations: [AppComponent, DicerollerComponent, InfoComponent, NavagationbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // MatButtonModule,
    // MatSelectModule,
    MatNativeDateModule,
    DemoMaterialModule,
    // FormControl,
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }, ],
  bootstrap: [AppComponent],
})
export class AppModule {}
