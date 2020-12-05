import { CellAction } from './../../../common/src/lib/models/cell-action.model';
import {
  DataGridConfig,
  ColumnDefinition,
  PipeConstants,
  DataGridFeatures,
  DataGridPagination,
  ExpandableData,
  DynamicComponentModel} from '@lowcodeunit/data-grid';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DepartureTableModel } from './models/departure-table-config.model';
import { WeatherCloudConditionIcons } from './utils/icons/weather-cloud-conditions-icons.util';
import { WeatherCloudService } from './services/weathercloud.service';
import { of } from 'rxjs/internal/observable/of';
import { JsonDisplayComponent } from './components/json-display/json-display.component';
import { ColumnDefinitionModel } from 'projects/common/src/lcu.api';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  /**
   * Parameters needed for the grid
  */
  protected _gridParameters: DataGridConfig;
  public set GridParameters(val: DataGridConfig) {
    this._gridParameters = val;
  }

  public get GridParameters(): DataGridConfig {
    return this. _gridParameters;
  }

  public DynamicComponents: Array<DynamicComponentModel>;

  /**
   * Page title
   */
  public Title: string = 'demo';

  /**
   * Toggle additional row details
   */
  public ToggleRowDetails: any;

  /**
   * Token key for service call
   */
  protected apiKey: string = '';

  /**
   * Sets column names and order
   */
  protected columnDefs: Array<ColumnDefinition> = [];
  protected colunmDefsModel: Array<ColumnDefinitionModel>;

  /**
   * Store grid parameters
   */
  protected _params: DepartureTableModel;
  protected set params(val: DepartureTableModel) {
    this._params = val;
  }

  protected get params(): DepartureTableModel {
    return this._params;
  }

/**
 * Grid features, such as: Pagination, Filtering, Loader, etc.
 */
  protected _gridFeatures: DataGridFeatures;
  public get GridFeatures(): DataGridFeatures {
    return this._gridFeatures;
  }

  public set GridFeatures(val: DataGridFeatures) {
    this._gridFeatures = val;
  }

  constructor(private weatherCloudService: WeatherCloudService,
              protected expandableData: ExpandableData) {

      this.colunmDefsModel = [];
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this.setupDynamicComponents();
    }, 1000);
  }

  /**
   * Create grid columns
   */
    public SetupGridParameters(): void {
      this.colunmDefsModel = [
        new ColumnDefinitionModel({ ColType: 'id', Title: 'ID', ShowValue: true }),
        new ColumnDefinitionModel({ ColType: 'name', Title: 'Name', ShowValue: true }),
        new ColumnDefinitionModel({ ColType: 'age', Title: 'Age', ShowValue: true }),
        new ColumnDefinitionModel({ ColType: 'address', Title: 'Address', ShowValue: true }),
        new ColumnDefinitionModel({ ColType: 'actions', Title: 'Action', ShowValue: true, ShowIcon: true,
                                    IconConfigFunc: () => 'preview', // function that returns the material icon to display
                                    Action:
                                    {
                                      ActionHandler: this.RowDetails.bind(this),
                                      ActionLabel: 'JSON',
                                      ActionType: 'button',
                                      ActionTooltip: 'sadfsd'
                                    }
                                  })];

      this.setGridFeatures();
    }

    /**
     *
     * @param val selected row element
     *
     * This sets '$IsExpanded' property to row data, really shouldn't mutate the data like this
     * '$IsExpanded' is used to expand or collapse selected row details container
     *
     * TODO: move off the data mutation to something better, maybe for Jack - shannon
     */
    protected RowDetails(val: any): void {
      val.$IsExpanded = !val.$IsExpanded;
    }

    /**
     * Build out grid data
     */
    public GridData(): void {
      this.SetupGridParameters();
      this.GridParameters = new DataGridConfig(
          of(this.expandableData.StudentData), // mock observable
          this.colunmDefsModel,
          this.GridFeatures
      );
    }

    /**
     * Setting up grid features
     */
    protected setGridFeatures(): void {
      const paginationDetails: DataGridPagination = new DataGridPagination();
      paginationDetails.PageSize = 10;
      paginationDetails.PageSizeOptions = [1, 5, 10, 20, 30];

      const features: DataGridFeatures = new DataGridFeatures();
      features.Paginator = paginationDetails;
      features.Filter = true;
      features.ShowLoader = true;
      features.RowColorEven = 'gray';
      features.RowColorOdd = 'light-gray';

      this.GridFeatures = features;
    }

    /**
     * Setup dynamic components to inject into datagrid
     */
    protected setupDynamicComponents(): void {
      this.DynamicComponents = [
        new DynamicComponentModel({ Component: JsonDisplayComponent,
                                    Data: {},
                                    Label: 'JSON Display' })
      ];
    }
}
