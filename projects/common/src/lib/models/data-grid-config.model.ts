import { DataGridPagination } from '../configs/data-grid-pagination.config';
import { ColumnDefinition } from '../configs/column-def.config';
import { Observable } from 'rxjs/internal/Observable';
import { DataGridFeaturesModel } from './data-grid-features.model';


export class DataGridConfigModel {
  public ColumnDefs: Array<ColumnDefinition>;
  public Service?: Observable<any[]>;
  public Features?: DataGridFeaturesModel;
}
