import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './controls/data-grid/data-grid.component';
import { MaterialModule, PipeModule } from '@lcu/common';
import { ExpandDataGridComponent } from './controls/expand-data-grid/expand-data-grid.component';
import { ExpandableData } from './controls/expandable.data';
import { FlexModule } from '@angular/flex-layout';
import { DynamicComponent } from './controls/dynamic-component/dynamic.component';
import { DynamicTestComponent } from './controls/dynamic-test/dynamic-test.component';

@NgModule({
  declarations: [
    DataGridComponent,
    ExpandDataGridComponent,
    DynamicComponent,
    DynamicTestComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipeModule,
    FlexModule
  ],
  providers: [ExpandableData],
  exports: [DataGridComponent, ExpandDataGridComponent, DynamicComponent, DynamicTestComponent, ],
  entryComponents: [DataGridComponent, ExpandDataGridComponent, DynamicComponent, DynamicTestComponent]
})
export class DataGridModule { }
