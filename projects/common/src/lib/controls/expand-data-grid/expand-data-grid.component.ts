import { ExpandableData } from '../expandable.data';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { bindCallback } from 'rxjs';

@Component({
  selector: 'lcu-expand-data-grid',
  templateUrl: './expand-data-grid.component.html',
  styleUrls: ['./expand-data-grid.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExpandDataGridComponent implements OnInit {

  dataStudentsList = new MatTableDataSource();
  displayedStudentsColumnsList: string[] = ['id', 'name', 'age', 'address', 'actions'];
  isTableExpanded = false;

  constructor(protected expandableData: ExpandableData) {

   }

  ngOnInit(): void {
    this.dataStudentsList.data = this.expandableData.StudentData;
  }

  // Toggel Rows
  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;

    this.dataStudentsList.data.forEach((row: any) => {
      row.$IsExpanded = this.isTableExpanded;
    });
  }

}
