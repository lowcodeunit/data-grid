import { DataGridPagination } from './data-grid-pagination.config';

export class DataGridFeatures {
  public Paginator: DataGridPagination;
  public RowSelectable: boolean = false;
  public Filter: boolean = false;
  public RowColorEven: string = '#ececec';
  public RowColorOdd: string = '#f5f5f5';
  public ShowLoader: boolean = false;
  public ShowSelection: boolean = false;
}
