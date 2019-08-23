import {
  DataGridConfig,
  ColumnDefinition,
  PipeConstants,
  DataGridFeatures,
  DataGridPagination } from '@lowcodeunit/data-grid';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DepartureTableModel } from './models/departure-table-config.model';
import { WeatherCloudConditionIcons } from './utils/icons/weather-cloud-conditions-icons.util';
import { WeatherCloudService } from './services/weathercloud.service';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  /**
   * Parameters needed for the grid
  */
  protected _gridParameters: DataGridConfig;
  public set GridParameters(val: DataGridConfig) {
    this._gridParameters = val;
  }

  public get GridParameters(): DataGridConfig {
    return this. _gridParameters;
  }

  /**
   * Page title
   */
  public Title: string = 'demo';

  /**
   * Token key for service call
   */
  protected apiKey: string = '';

  /**
   * Sets column names and order
   */
  protected columnDefs: Array<ColumnDefinition> = [];

  /**
   * Store grid parameters
   */
  protected _params: DepartureTableModel;
  protected set params(val: DepartureTableModel) {
    this._params = val;
  }

  protected get params(): DepartureTableModel {
    return this._params;
  }
  // protected departureTableSubsscription: Subscription;
  // protected routeChangeSubscription: Subscription;

/**
 * Grid features, such as: Pagination, Filtering, Loader, etc.
 */
  protected _gridFeatures: DataGridFeatures;
  public get GridFeatures(): DataGridFeatures {
    return this._gridFeatures;
  }

  public set GridFeatures(val: DataGridFeatures) {
    this._gridFeatures = val;
  }

  constructor(private weatherCloudService: WeatherCloudService) {}

  public ngOnInit(): void {
    this.SetGridParameters();
  }

  /**
   * This sets up the grid parameters (columns, data, and features)
   */
  public SetGridParameters(): void {

    // hardcoding values for demo, real world these would be pushed in
    this.params = new DepartureTableModel('32.7499,-97.33034', '40.58897,-105.08246', '1545937200', false);

    this.apiKey = 'fathym';

    this.columnDefs = [
     new ColumnDefinition(
       'VtimesStart',
       '',
       true,
       false,
       false,
       PipeConstants.PIPE_EPOCH
       ),
     new ColumnDefinition(
       'TempMin',
       'Temp Min',
       true,
       true,
       false,
       PipeConstants.PIPE_TEMP_FAHRENHEIT,
       WeatherCloudConditionIcons
       ),
     new ColumnDefinition(
       'TempMax',
       'Temp Max',
       true,
       true,
       false,
       PipeConstants.PIPE_TEMP_FAHRENHEIT,
       WeatherCloudConditionIcons
       ),
     new ColumnDefinition(
       'PrecipMax',
       'Precipitation',
       false,
       true,
       false,
       null,
       WeatherCloudConditionIcons
       ),
     new ColumnDefinition(
       'WindSpdMax',
       'Wind Speed',
       true,
       true,
       false,
       PipeConstants.PIPE_MPH,
       WeatherCloudConditionIcons
       ),
     new ColumnDefinition(
       'WindGustMax',
       'Wind Gust',
       true,
       true,
       false,
       PipeConstants.PIPE_MPH,
       WeatherCloudConditionIcons
       )
     ];

     this.setGridFeatures();

    // showing grid column headers
    this.GridParameters = new DataGridConfig(null, this.columnDefs);
    }

    /**
     * Setting up the grid data, columns, and features
     */
    public GridData(): void {
      const origin = '40.58897,-105.08246';
      const destination = '40.3978,-105.0750';
      const includeAlts = true;
      const departTime = '1566503558';

        this.GridParameters = new DataGridConfig(
          this.weatherCloudService.departureTableData(this.apiKey, origin, destination, departTime, includeAlts),
          this.columnDefs,
          this.GridFeatures
        );

      // this.GridParameters = new DataGridConfig(
      //   this.weatherCloudService.departureTableData(
      //                                              this.apiKey,
      //                                              this.params.origin,
      //                                              this.params.destination,
      //                                              this.params.departureTime,
      //                                              this.params.includeAltRoutes), this.columnDefs, this.GridFeatures);
    }

    /**
     * Setting up grid features
     */
    protected setGridFeatures(): void {
      const paginationDetails: DataGridPagination = new DataGridPagination();
      paginationDetails.PageSize = 10;
      paginationDetails.PageSizeOptions = [1, 5, 10, 20, 30];

      const features: DataGridFeatures = new DataGridFeatures();
      features.Paginator = paginationDetails;
      features.Filter = true;
      features.ShowLoader = true;
      features.RowColorEven = 'gray';
      features.RowColorOdd = 'light-gray';

      this.GridFeatures = features;
    }
}
