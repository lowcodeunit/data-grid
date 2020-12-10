import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Component,
  ViewChild,
  AfterViewInit,
  Input,
  AfterContentChecked,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChildren,
  QueryList,
  ElementRef} from '@angular/core';

import { DataGridConfig } from '../../configs/data-grid.config';
import { ColumnConfigModel } from '../../models/column-config.model';
import { throwError } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DynamicComponent } from '../dynamic-component/dynamic.component';
import { DynamicComponentService } from '../../services/dynamic-component.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'lcu-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DataGridComponent<T> extends DynamicComponent<T> implements AfterViewInit, AfterContentChecked {

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
  @Input('config')
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
   * Sets grid rows to be expandable
   */
  private _expand: boolean;
  @Input('expand')
  set Expand(val: boolean) {
    this._expand = coerceBooleanProperty(val);
  }

  get Expand(): boolean {
    return this._expand;
  }

  @Output('page-event')
  public PageEvent: EventEmitter<any>;

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

  // public DynamicComponents: Array<DynamicComponentModel>;

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

  constructor(
    protected cdref: ChangeDetectorRef,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected dynamicComponentService: DynamicComponentService) {
    super(componentFactoryResolver, dynamicComponentService);
    this.PageEvent = new EventEmitter();
  }

  /**
   * When loaded set sorting and pagination
   */
  public ngAfterViewInit(): void {
    this.Sorting();

    this.Pagination();
  }

  /**
   * Check view and children for changes
   */
  public ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  // protected setViewComponent(content: ViewContainerRef): void {
  //   // super.DynamicViewContainer = content;
  // }

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
 * Handles the page change event from mat-paginator
 * @param event page change event
 */
  public HandlePageChange(event: any): void {
    // console.log("Page event: ", event);
    this.PageEvent.emit(event);
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

    if (!this.Config || !this.Config.Features) {
      return;
    }

    this.RowColorEven = this.Config.Features.RowColorEven;

    this.RowColorOdd = this.Config.Features.RowColorOdd;
  }

  public RowColors(even: number, odd: number): string {

    if (even) {
      return this.RowColorEven;
    } else {
      if (odd) {
        return this.RowColorOdd;
      }
    }
  }
}
