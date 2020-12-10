import { Observable } from 'rxjs/internal/Observable';
import { DataGridFeaturesModel } from '../models/data-grid-features.model';
import { ColumnDefinitionModel } from '../models/column-definitions.model';

export class DataGridConfigModel {

    public ColumnDefs: Array<ColumnDefinitionModel>;
    public Features: DataGridFeaturesModel;
    public Service: Observable<any[]>;

  /**
   * Constructor for DataGridConfig
   *
   * @param columdDefs Definitions for column properties
   *
   * @param service Service to call for data
   *
   * @param features Pagination and Filtering, and other things
   *
   */

  constructor(
    service: Observable<any[]>,
    columnDefs: Array<ColumnDefinitionModel>,
    features?: DataGridFeaturesModel) {
    this.ColumnDefs = columnDefs;
    this.Features = features;
    this.Service = service;
  }
}

