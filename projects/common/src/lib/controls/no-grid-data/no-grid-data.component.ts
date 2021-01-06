import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { DataGridConfigModel } from '../../models/data-grid-config.model';
import { DynamicComponentModel } from '../../models/dynamic-component.model';
import { DynamicComponentService } from '../../services/dynamic-component.service';
import { DynamicComponent } from '../dynamic-component/dynamic.component';

@Component({
  selector: 'lcu-no-grid-data',
  templateUrl: './no-grid-data.component.html',
  styleUrls: ['./no-grid-data.component.scss']
})
export class NoGridDataComponent<T> extends DynamicComponent<T> implements OnInit {

/**
    * Configuration for the data grid
    *
    * This contains column definitions, data, and grid features
    */
   private _config: DataGridConfigModel;
   @Input('config')
   set Config(val: DataGridConfigModel) {
     if (!val) {
       return;
     }

     this._config = val;
   }
   get Config(): DataGridConfigModel {

     if (!this._config) {
       return;
     }
     return this._config;
   }

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected dynamicComponentService: DynamicComponentService) {
    super(componentFactoryResolver, dynamicComponentService);
   }

  ngOnInit(): void {
    
  }

}
