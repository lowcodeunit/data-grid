import { DataGridPagination } from './data-grid-pagination.config';

export class DataGridFeatures {
  public Paginator: DataGridPagination;
  public RowSelectable: boolean = false;
  public Filter: boolean = false;
  public ShowLoader: boolean = false;
  public ShowSelection: boolean = false;
}