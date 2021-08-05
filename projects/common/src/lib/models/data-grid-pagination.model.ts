
export class DataGridPaginationModel {

    public Length?: number;
    public PageIndex?: number;
    public PageSize: number;
    public PageSizeOptions: Array<number>;

  /**
   * Constructor for DataGridPagination
   *
   * @param Length The number of items in the grid
   * 
   * @param Page The current page number
   * 
   * @param PageSize Selected page size, number of rows to show
   *
   * @param PageSizeOptions Array of page size selection, [1, 5, 10, etc]
   *
   */
  constructor(opts: DataGridPaginationModel) {
    Object.assign(this, opts); // destructure values
  }
}
