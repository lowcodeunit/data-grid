import { CellAction } from './../models/cell-action.model';

export class ColumnDefinitionModel {
  public Action?: CellAction;
  public ColType?: string;
  public ColWidth?: string;
  public ColBGColor?: string;
  // public Ellipsis?: boolean; not using this yet
  public IconConfigFunc?: Function;
  public IconColor?: string;
  public Image?: string;
  public Pipe?: string | Function;
  public Title: string;
  public ShowIcon?: boolean;
  public ShowValue?: boolean;
  public Sortable?: boolean;
  public Tooltip?: boolean;
  public Width?: number;
  public WordBreak?: boolean;

/**
 * Constructor for Grid column definitions
 * @param Action Cell action
 * @param ColType Column data type
 * @param ColWidth Width of the column
 * @param ColBGColor Set color of cell
 * @param Ellipsis Toggle ellipsis for long text
 * @param IconConfigFunc Callback function for setting icons
 * @param IconColor Set icon color
 * @param Image If we want to show a image in the cell
 * @param Title Column title
 * @param ShowValue Boolean for toggling icons
 * @param ShowIcon Boolean for toggling icons
 * @param Sortable Allow column to be sorted
 * @param Tooltip Toggle tooltip
 * @param Pipe String value of pipe to use
 * @param Width Cell width
 * @param WordBreak break long lines of text

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

