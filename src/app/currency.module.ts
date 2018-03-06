import {NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule } from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { CurrencyComponent } from './currency.component';
import { RootComponent } from './root.component';
import { DecimalValidation } from './validation.directive';


export class MaterialModule {}

@NgModule({

    imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule
    ],
    
  declarations: [ CurrencyComponent,RootComponent,DecimalValidation],
  bootstrap: [RootComponent],
  providers: []
})

export class CurrencyModule {}

