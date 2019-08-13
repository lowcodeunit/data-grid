import { Component,
  ViewChild,
  AfterViewInit,
  Input,
  AfterContentChecked,
  ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { DataGridConfig } from '../../configs/data-grid.config';
import { ColumnConfigModel } from '../../models/column-config.model';
import { throwError } from 'rxjs';

@Component({
  selector: 'lcu-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements AfterViewInit, AfterContentChecked {

   /**
   * DataGrid configuration properties
   *
   * @param columdDefs Definitions for column properties
   *
   * @param service Service to call for data
   *
   * @param features Pagination / Filtering and other configurables
   *
   */

   /**
    * Configuration for the data grid
    *
    * This contains column definitions, data, and grid features
    */
  private _config: DataGridConfig;

  @Input()
  set Config(val: DataGridConfig) {
    if (!val) {
      return;
    }

    this._config = val;
    this.setData();
  }
  get Config(): DataGridConfig {

    if (!this._config) {
      return;
    }
    return this._config;
  }

  /**
   * Material Sorter
   */
  @ViewChild(MatSort, {static: false}) sort: MatSort;


  /**
   * Material Paginator
   */
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  /**
   * Columns to display
   */
  public displayedColumns: Array<string> = [];

  /**
   * Grid data source
   */
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  public RowColorEven: string;

  public RowColorOdd: string;

  /**
   * Maintain the selected state
   */
  public selection: SelectionModel<any> = new SelectionModel(true, []);

  /**
   * Toggle loading indicator
   */
  public ShowLoader: boolean = false;

  constructor(private cdref: ChangeDetectorRef) { }

  /**
   * When loaded set sorting and pagination
   */
  ngAfterViewInit() {
    this.Sorting();
    this.Pagination();
  }

  /**
   * Check view and children for changes
   */
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  /**
   * When sorting is set in columnDef
   */
  public Sorting(evt?: Event): void {
    this.dataSource.sort = this.sort;
  }

  /**
   * Toggle pagination
   * Pagination properties
   */
  public Pagination(): void {
    if (!this.Config || !this.Config.Features || !this.Config.Features.Paginator) {
      return;
    }

    this.dataSource.paginator =  this.paginator;
  }

  /**
   * When filtering is enabled, run the filter
   *
   * @param filterValue term to fitler on
   */
  public ApplyFilter(filterValue: string): void {
    if (!this.Config.Features.Filter) {
      return;
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Toggle selection checkbox
   *
   * @param config grid conifguration object
   *
   * @param col grid column
   *
   */
  public ToggleSelection(config: DataGridConfig, col: ColumnConfigModel): boolean {
    return col.ColType === 'select';
  }
/**
 * Check to see if all rows are selected
 */
  public IsAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Select all rows with the master toggle checkbox
   */
  public MasterToggle(): void {
    this.IsAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**
   * @param val property to toggle loading indicator
   */
  private showLoaderIndicator(val: boolean): void {

    if (!this.Config.Features || !this.Config.Features.ShowLoader) {
      return;
    }

    this.ShowLoader = val;
  }

  /**
   * Set grid data
   */
  private setData(): void {
    if (!this.Config || !this.Config.ColumnDefs) {
      return;
    }

    this.createDisplayedColumns();
    this.setRowColors();

      if (this.Config.Service) {
        this.showLoaderIndicator(true);
        // service is passed in from parent component using the grid
       this.Config.Service
        .subscribe((res) => {
          this.dataSource.data = res;
        }, (err) => {
          return throwError(err);
        }, () => {
          this.showLoaderIndicator(false);
        }
      );
    }
  }

  /**
   * Return array of columns to display
   */
  protected createDisplayedColumns(): void {
    if (!this.Config || !this.Config.ColumnDefs) {
      return;
    }

    this.displayedColumns = this.Config.ColumnDefs.map(itm => {
      return itm.ColType;
    });
  }

  /**
   * set datagrid row colors
   */
  protected setRowColors(): void {
    if (!this.Config.Features) {
      return;
    }

    this.RowColorEven = this.Config.Features.RowColorEven;
    this.RowColorOdd = this.Config.Features.RowColorOdd;
  }

  public RowColors(even, odd): string {
    if (even) {
      return this.RowColorEven;
    } else {
      if (odd) {
        return this.RowColorOdd;
      }
    }
    // const classes = {
    //   important: this.isImportant,
    //   inactive: !this.isActive,
    //   saved: this.isSaved,
    //   long: this.name.length > 6
    // };
    // return classes;
  }
}
