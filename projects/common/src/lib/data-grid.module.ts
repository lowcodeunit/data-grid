import { DynamicComponentService } from './services/dynamic-component.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './controls/data-grid/data-grid.component';
import { MaterialModule, PipeModule } from '@lcu/common';
import { ExpandDataGridComponent } from './controls/expand-data-grid/expand-data-grid.component';
import { ExpandableData } from './controls/expandable.data';
import { FlexModule } from '@angular/flex-layout';
import { DynamicComponent } from './controls/dynamic-component/dynamic.component';

@NgModule({
  declarations: [
    DataGridComponent,
    ExpandDataGridComponent,
    DynamicComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipeModule,
    FlexModule
  ],
  providers:
  [
    ExpandableData,
    DynamicComponentService
  ],
  exports:
  [
    DataGridComponent,
    ExpandDataGridComponent,
    DynamicComponent
  ],
  entryComponents:
  [
    DataGridComponent,
    ExpandDataGridComponent,
    DynamicComponent
  ]
})
export class DataGridModule { }
