import { CellAction } from './../models/cell-action.model';

export class ColumnDefinitionModel {
  public Action?: CellAction;
  public ColType?: string;
  public IconConfigFunc?: Function;
  public Pipe?: string;
  public Title: string;
  public ShowIcon?: boolean;
  public ShowValue?: boolean;
  public Sortable?: boolean;

/**
 * Constructor for Grid column definitions
 * @param Action Cell action
 * @param ColType Column data type
 * @param Title Column title
 * @param ShowValue Boolean for toggling icons
 * @param ShowIcon Boolean for toggling icons
 * @param Sortable Allow column to be sorted
 * @param Pipe String value of pipe to use
 * @param IconConfigFunc Callback function for setting icons
 */

constructor(opts: ColumnDefinitionModel) {

    /**
     * if no colType set default value
     *
     * This could be useful for adding a button to a cell, when
     * there isn't data to go with it
     */
    // if (!opts.ColType) {
    //   opts.ColType = 'noColTypeDefined';
    // }

    Object.assign(this, opts); // destructure values
}

  /**
   * Toggle icons or data values on / off
   * @param colObj Each item coming from the grid rows
   */
  public SetIcon?<T>(colObj: T): void {

    if (this.ShowIcon && this.IconConfigFunc) {
     return this.IconConfigFunc(colObj, this.ColType);
    }
  }
}

