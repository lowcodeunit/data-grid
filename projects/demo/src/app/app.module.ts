import { MaterialModule } from './../../../common/src/lib/modules/material.module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DataGridModule } from '@lowcodeunit/data-grid';
import { FathymSharedModule } from '@lcu-ide/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DataGridModule,
    FathymSharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
