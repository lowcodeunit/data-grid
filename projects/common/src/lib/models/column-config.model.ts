import { CellAction } from './cell-action.model';
export class ColumnConfigModel {
  public Action?: CellAction;
  public ColType: string;
  public Icon: string;
  public IconConfigFunc?: Function;
  public Pipe?: string;
  public ShowIcon: boolean;
  public ShowMatIcon?: boolean;
  public ShowValue: boolean;
  public Sortable?: boolean;
  public Title: string;
  public Value: string;
}
