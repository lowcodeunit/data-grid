import { Observable } from 'rxjs/internal/Observable';
import { ColumnDefinition } from './column-def.config';
import { DataGridFeaturesModel } from '../models/data-grid-features.model';
import { DataGridFeatures } from './data-grid-features.config';
import { ColumnDefinitionModel } from '../models/column-definitions.model';

export class DataGridConfig {

    public ColumnDefs: Array<ColumnDefinitionModel>;
    public Features: DataGridFeatures;
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

  constructor(service: Observable<any[]>, columnDefs: Array<ColumnDefinitionModel>, features?: DataGridFeatures) {
    this.ColumnDefs = columnDefs;
    this.Features = features;
    this.Service = service;
  }
}
