/**
 * app.module.css
 *
 * @dateCreated 18/02/2018
 * @author Dean Heffernan
 */

// Imports.
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {RichListService} from '../services/richList.service';
import {CurrencyConvertPipe} from '../pipes/currencyConvert..pipe';

// Defile app module
@NgModule({
  declarations: [
    AppComponent,
    CurrencyConvertPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    RichListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
