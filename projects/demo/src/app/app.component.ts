import {
  ExpandableData,
  DynamicComponentModel,
  ColumnDefinitionModel,
  DataGridFeaturesModel,
  DataGridConfigModel,
  DataGridPaginationModel,
} from '@lowcodeunit/data-grid';
import { Component, OnInit } from '@angular/core';
import { DepartureTableModel } from './models/departure-table-config.model';
import { WeatherCloudService } from './services/weathercloud.service';
import { of } from 'rxjs';
import { JsonDisplayComponent } from './components/json-display/json-display.component';
import { DummyTesterComponent } from './components/dummy-tester/dummy-tester.component';
import { DataPipeConstants } from '@lcu/common';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

 /**
  * Array for storing dynamic component that are added to grid row
  */
  public DynamicComponents: Array<DynamicComponentModel>;

  public NoDataDynmaicComponents: Array<DynamicComponentModel>;

 /**
   * Parameters needed for the grid
  */

 public GridParameters: DataGridConfigModel;

  /**
   * Page title
   */
  public Title: string = 'demo';

  /**
   * Toggle additional row details
   */
  public ToggleRowDetails: any;

  /**
   * Sets column names and order
   */
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
  protected _gridFeatures: DataGridFeaturesModel;
  public get GridFeatures(): DataGridFeaturesModel {
    return this._gridFeatures;
  }

  public set GridFeatures(val: DataGridFeaturesModel) {
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

    // this.GridData();
  }

  /**
   * Create grid columns
   */
    public SetupGridParameters(): void {
      this.colunmDefsModel = [
        new ColumnDefinitionModel(
          {
            ColType: 'id',
            ColBGColor: 'red',
            ColWidth: '35px',
            Title: 'ID',
            ShowValue: true
          }
        ),
        new ColumnDefinitionModel(
          {
            ColType: 'name',
            ColBGColor: 'blue',
            Title: 'Name',
            ShowValue: true,
            Pipe: (rowData: any) => {
              return '';
            }
        }),
        new ColumnDefinitionModel({
          ColType: 'token',
          Title: 'Token',
          ColBGColor: '#ffcc11',
          ColWidth: '50%',
          ShowValue: true,
          Tooltip: true,
          WordBreak: true,
          Pipe: DataPipeConstants.PIPE_STRING_SLICE_FIFTY
        }),
        new ColumnDefinitionModel(
          {
            ColType: 'age',
            ColBGColor: 'orange',
            Title: 'Age',
            ShowValue: true
          }
        ),
        new ColumnDefinitionModel(
          {
            ColType: 'actions',
            ColWidth: '10',
            ColBGColor: 'green',
            Title: 'Action',
            ShowValue: true,
            ShowIcon: true,
            IconColor: 'accent-primary-text',
            IconConfigFunc: () => {
              return 'preview'; // function that returns the material icon to display
            },
            Action:
            {
              ActionHandler: this.RowDetails.bind(this),
              ActionLabel: '',
              ActionType: 'button',
              ActionTooltip: 'View'
            }
          }),
        new ColumnDefinitionModel(
          {
            ColType: 'address',
            ColBGColor: 'purple',
            Title: 'Address',
            ShowValue: true
          }
        )
        ];

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
    protected RowDetails(val: ColumnDefinitionModel): void {
      val['$IsExpanded'] = !val['$IsExpanded'];
    }

    /**
     * Build out grid data
     */
    public GridData(): void {

      this.SetupGridParameters();

      this.GridParameters = new DataGridConfigModel(
          of(this.expandableData.StudentDataOne), // mock observable
          this.colunmDefsModel,
          this.GridFeatures
      );
    }

    /**
     * Setting up grid features
     */
    protected setGridFeatures(): void {

      const paginationDetails: DataGridPaginationModel = new DataGridPaginationModel(
        {
          Length: this.expandableData.StudentData.length,
          PageIndex: 0,
          PageSize: 1,
          PageSizeOptions: [1, 5, 10, 20, 30]
        }
      );

      const features: DataGridFeaturesModel = new DataGridFeaturesModel(
        {
         NoData: {
           Title: 'No Data',
           Info: 'Testing no data info',
           Component: DummyTesterComponent
          },
         Paginator: paginationDetails,
         Filter: true,
         ShowLoader: true,
         Highlight: 'highlight',
         RowColorEven: 'evenRowColor',
         RowColorOdd: 'oddRowColor',
         MobileBreakpoint: '500px'
        }
      );

      this.GridFeatures = features;
    }

    /**
     * Setup dynamic components to inject into datagrid
     */
    protected setupDynamicComponents(): void {
      this.DynamicComponents = [
        new DynamicComponentModel(
          {
            Component: JsonDisplayComponent,
            Data: {},
            Label: 'JSON Display'
          }),
        new DynamicComponentModel(
          {
            Component: DummyTesterComponent,
            Data: {},
            Label: 'No data test component'
          })
      ];
    }
}
