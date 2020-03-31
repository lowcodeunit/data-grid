import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './controls/data-grid/data-grid.component';
import { MaterialModule, PipeModule } from '@lcu/common';

@NgModule({
  declarations: [
    DataGridComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipeModule
  ],
  exports: [DataGridComponent, ],
  entryComponents: [DataGridComponent]
})
export class DataGridModule { }
