import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TollCalculatorComponent } from './toll-calculator/toll-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    TollCalculatorComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
