
export class DataGridPaginationModel {

    public PageSize: number;
    public PageSizeOptions: Array<number>;

  /**
   * Constructor for DataGridPagination
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
