import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataGridModule } from '@lowcodeunit/data-grid';
import { FathymSharedModule, MaterialModule, PipeModule } from '@lcu/common';
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
    FlexModule,
    PipeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [JsonDisplayComponent],
  entryComponents: [JsonDisplayComponent]
})
export class AppModule { }
