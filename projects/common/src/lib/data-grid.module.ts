import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './controls/data-grid/data-grid.component';

@NgModule({
  declarations: [DataGridComponent],
  imports: [
    CommonModule
  ],
  exports: [DataGridComponent],
  entryComponents: [DataGridComponent]
})
export class DataGridModule { }
