import {
  DataGridConfig,
  ColumnDefinition,
  PipeConstants,
  DataGridFeatures,
  DataGridPagination } from '@lowcodeunit/data-grid';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DepartureTableModel } from './models/departure-table-config.model';
import { WeatherCloudConditionIcons } from './utils/icons/weather-cloud-conditions-icons.util';
import { WeatherCloudService } from './services/weathercloud.service';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public GridParameters: DataGridConfig;
  public Title: string = 'demo';

  protected columnDefs: Array<ColumnDefinition> = [];
  protected apiKey: string = '';
  protected departureTableSubsscription: Subscription;
  protected routeChangeSubscription: Subscription;

  constructor(private weatherCloudService: WeatherCloudService) {}

/**
   * This sets up the grid parameters (columns and data, and features)
   */
  public setGridParameters(): void {

    // for down and dirty testing
    const params: DepartureTableModel = new DepartureTableModel('32.7499,-97.33034', '40.58897,-105.08246', '1545937200', false);

    this.apiKey = 'fathym';

    this.columnDefs = [
     new ColumnDefinition(
       'vtimesStart',
       '',
       true,
       false,
       false,
       PipeConstants.PIPE_EPOCH
       ),
     new ColumnDefinition(
       'tempMin',
       'Temp Min',
       true,
       true,
       false,
       PipeConstants.PIPE_TEMP_FAHRENHEIT,
       WeatherCloudConditionIcons
       ),
     new ColumnDefinition(
       'tempMax',
       'Temp Max',
       true,
       true,
       false,
       PipeConstants.PIPE_TEMP_FAHRENHEIT,
       WeatherCloudConditionIcons
       ),
     new ColumnDefinition(
       'precipMax',
       'Precipitation',
       false,
       true,
       false,
       null,
       WeatherCloudConditionIcons
       ),
     new ColumnDefinition(
       'windSpdMax',
       'Wind Speed',
       true,
       true,
       false,
       PipeConstants.PIPE_MPH,
       WeatherCloudConditionIcons
       ),
     new ColumnDefinition(
       'windGustMax',
       'Wind Gust',
       true,
       true,
       false,
       PipeConstants.PIPE_MPH,
       WeatherCloudConditionIcons
       )
     ];

     const paginationDetails: DataGridPagination = new DataGridPagination();
     paginationDetails.PageSize = 10;
     paginationDetails.PageSizeOptions = [1, 5, 10, 20, 30];

     const features: DataGridFeatures = new DataGridFeatures();
     features.Paginator = paginationDetails;
     features.Filter = true;
     features.ShowLoader = true;

   this.GridParameters = new DataGridConfig(
     this.weatherCloudService.departureTableData(
                                                this.apiKey,
                                                params.origin,
                                                params.destination,
                                                params.departureTime,
                                                params.includeAltRoutes), this.columnDefs, features);
    }


}
