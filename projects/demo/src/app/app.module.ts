import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DataGridModule } from '@lowcodeunit/data-grid';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { JsonDisplayComponent } from './components/json-display/json-display.component';

@NgModule({
  declarations: [
    AppComponent,
    JsonDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DataGridModule,
    FathymSharedModule,
    MaterialModule,
    FlexModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [JsonDisplayComponent],
  entryComponents: [JsonDisplayComponent]
})
export class AppModule { }
