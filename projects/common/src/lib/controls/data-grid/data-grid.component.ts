import { ColumnDefinitionModel } from './../../models/column-definitions.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  BreakpointObserver, Breakpoints, BreakpointState
} from '@angular/cdk/layout';

import { Component,
  ViewChild,
  AfterViewInit,
  Input,
  AfterContentChecked,
  ChangeDetectorRef,
  ComponentFactoryResolver
} from '@angular/core';

import { throwError } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DynamicComponent } from '../dynamic-component/dynamic.component';
import { DynamicComponentService } from '../../services/dynamic-component.service';
import { Output, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DataGridConfigModel } from '../../models/data-grid-config.model';

@Component({
  selector: 'lcu-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('500ms ease-in-out')),
    ]),
  ]
})
export class DataGridComponent<T> extends DynamicComponent<T> implements OnInit, AfterViewInit, AfterContentChecked {

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
  private _config: DataGridConfigModel;
  @Input('config')
  set Config(val: DataGridConfigModel) {
    if (!val) {
      return;
    }

    this._config = val;
    this.MobileBreakpoint = this.Config.Features.MobileBreakpoint;
    this.breakpointListener();
    this.setData();
  }
  get Config(): DataGridConfigModel {

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

  // tslint:disable-next-line:no-output-rename
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
  public dataSource: MatTableDataSource<ColumnDefinitionModel>;

  /**
   * Checking for mobile width
   */
  public IsMobile: boolean;

  public MobileBreakpoint: string;

  /**
   * Even row color
   */
  public RowColorEven: string;

  /**
   * Odd row color
   */
  public RowColorOdd: string;

  /**
   * Row hover toggle
   */
  public RowHover: boolean;

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
    protected dynamicComponentService: DynamicComponentService,
    protected breakpointObserver: BreakpointObserver) {

    super(componentFactoryResolver, dynamicComponentService);

    this.IsMobile = false;
    this.dataSource = new MatTableDataSource<ColumnDefinitionModel>();
    this.PageEvent = new EventEmitter();
  }

  public ngOnInit(): void {
   // this.breakpointListener();
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

    // this.dataSource.paginator =  this.paginator;

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
  public ToggleSelection(config: DataGridConfigModel, col: ColumnDefinitionModel): boolean {

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
  public HandlePageChange(event: Event): void {

    this.PageEvent.emit(event);
  }

  /**
   * Set row background colors
   * 
   * There's a issue with this working when the expand is working
   * 
   * @param even even numbered grid row
   * @param odd odd number grid row
   */
  public RowColors(even: number, odd: number): string {

    if (even) {
      return this.RowColorEven;
    } else {
      if (odd) {
        return this.RowColorOdd;
      }
    }
  }

  /**
   * Check if NoData message should be shown inline,
   * this uses content projection
   */
  public ShowInline(): boolean {

   if (!this.dataSource || this.dataSource.data.length < 1 
    && (this.Config && this.Config?.Features?.NoData?.ShowInline)) {
      return true;
    }

   return false;
  }

  public CellWidth(col: ColumnDefinitionModel): string {

    if (col.ColWidth) {
     const width: string = col.ColWidth.includes('px') ? col.ColWidth : col.ColWidth + 'px';
     const value: string = width;

      return value;
    }

    return '';
  }

  /**
   * @param val property to toggle loading indicator
   */
  protected showLoaderIndicator(val: boolean): void {

    if (!this.Config.Features || !this.Config.Features.ShowLoader) {
      return;
    }

    this.ShowLoader = val;
  }

  /**
   * Monitor page breakpoints
   */
  protected breakpointListener(): void {

   if (!this.MobileBreakpoint) {
     return;
   }

    this.breakpointObserver
       .observe([`(min-width: ${ this.MobileBreakpoint })`])
       .subscribe((state: BreakpointState) => {
         if (state.matches) {
           this.IsMobile = false;
           console.log(`Viewport is ${ this.MobileBreakpoint } or over!`);
         } else {
           this.IsMobile = true;
           console.log(`Viewport is smaller than ${ this.MobileBreakpoint }!`);
         }

         console.log('ISMobile', this.IsMobile);
       });

    // let breakpoint: string =  this.Config ? this.Config.Features.MobileBreakpoint : '600px';

    // console.log(breakpoint);

    // this.breakpointObserver.observe([`(min-width: ${ breakpoint })`])
    // .subscribe((bState: BreakpointState) => {
    //   this.IsMobile = bState.matches;
    //   console.log('IS MOBILE', this.IsMobile);
    // });
  }

  /**
   * Set grid data
   */
  protected setData(): void {
    if (!this.Config || !this.Config.ColumnDefs) {
      return;
    }

    this.createDisplayedColumns();

    this.setRowColors();

      if (this.Config.Service) {
        this.showLoaderIndicator(true);

        // service is passed in from parent component using the grid
       this.Config.Service
        .subscribe((res: any) => {
          this.dataSource.data = [...res];
        }, (err: any) => {
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

    this.displayedColumns = this.Config.ColumnDefs.map( (itm: ColumnDefinitionModel) => {

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
}
