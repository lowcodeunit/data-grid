import { CellAction } from './../models/cell-action.model';

export class ColumnDefinitionModel {
  public Action?: CellAction;
  public ColType?: string;
  public ColWidth?: string;
  public ColBGColor?: string;
  public IconConfigFunc?: Function;
  public IconColor?: string;
  public Pipe?: string | Function;
  public Title: string;
  public ShowIcon?: boolean;
  public ShowValue?: boolean;
  public Sortable?: boolean;

/**
 * Constructor for Grid column definitions
 * @param Action Cell action
 * @param ColType Column data type
 * @param ColWidth Width of the column
 * @param ColBGColor Set color of cell
 * @param IconConfigFunc Callback function for setting icons
 * @param IconColor Set icon color
 * @param Title Column title
 * @param ShowValue Boolean for toggling icons
 * @param ShowIcon Boolean for toggling icons
 * @param Sortable Allow column to be sorted
 * @param Pipe String value of pipe to use

 */

constructor(opts: ColumnDefinitionModel) {

    Object.assign(this, opts); // destructure values
}

  /**
   * Toggle icons or data values on / off
   * 
   * @param colObj Each item coming from the grid rows
   */
  public SetIcon?<T>(colObj: T): void {

    if (this.ShowIcon && this.IconConfigFunc) {
     return this.IconConfigFunc(colObj, this.ColType);
    }
  }

  /**
   * Setting a data pipe to the cell value, can be a function or a string
   * 
   * @param colObj row data
   * @param val string value if the function isn't being used
   */
  public SetPipe?<T>(colObj: T, val: string): any {

    if (this.Pipe && typeof this.Pipe !== 'string') {
      return this.Pipe(colObj, this.ColType);
     }

     return val;
  }
}

