import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './controls/data-grid/data-grid.component';
import { DataGridPipes } from './utils/pipes/data-grid.pipes';
import { MaterialModule } from '@lcu/common';

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
