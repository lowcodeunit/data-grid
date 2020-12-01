import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './controls/data-grid/data-grid.component';
import { MaterialModule, PipeModule } from '@lcu/common';
import { ExpandDataGridComponent } from './controls/expand-data-grid/expand-data-grid.component';
import { ExpandableData } from './controls/expandable.data';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    DataGridComponent,
    ExpandDataGridComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipeModule,
    FlexModule
  ],
  providers: [ExpandableData],
  exports: [DataGridComponent, ExpandDataGridComponent, ],
  entryComponents: [DataGridComponent, ExpandDataGridComponent]
})
export class DataGridModule { }
