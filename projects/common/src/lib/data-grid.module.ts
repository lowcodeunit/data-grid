import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './controls/data-grid/data-grid.component';
import { MaterialModule } from './modules/material.module';
import { DataGridPipes } from './utils/pipes/data-grid.pipes';

@NgModule({
  declarations: [
    DataGridComponent,
    DataGridPipes,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [DataGridComponent, ],
  entryComponents: [DataGridComponent]
})
export class DataGridModule { }
