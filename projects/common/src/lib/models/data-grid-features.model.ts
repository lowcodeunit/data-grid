import { DataGridNoDataModel } from './data-grid-no-data.model';
import { DataGridPaginationModel } from './data-grid-pagination.model';

/**Datagrid Features */
export class DataGridFeaturesModel {

    public GridWidth?: string;
    public NoData?: DataGridNoDataModel;
    public Filter?: boolean;
    public Highlight?: string;
    public MobileBreakpoint?: string;
    public Paginator?: DataGridPaginationModel;
    public RowSelectable?: boolean = false;
    public RowColorEven?: string = '#ececec';
    public RowColorOdd?: string = '#f5f5f5';
    public ShowLoader?: boolean = false;
    public ShowSelection?: boolean = false;

  /**
   * Constructor for Grid column definitions
   * @param opts model parameters
   */

    constructor(opts: DataGridFeaturesModel) {

      Object.assign(this, opts); // destructure values
    }
  }