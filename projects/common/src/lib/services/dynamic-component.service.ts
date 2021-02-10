import { Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DynamicComponentModel } from '../models/dynamic-component.model';

@Injectable({
  providedIn: 'root'
})

export class DynamicComponentService {

  public OnDynamicComponentError: Subject<boolean>;

  protected _dynamicComponents: Array<DynamicComponentModel>;

  public set DynamicComponents(val: Array<DynamicComponentModel>) {
    this._dynamicComponents = val;
  }

  public get DynamicComponents(): Array<DynamicComponentModel> {
    return this._dynamicComponents;
  }

  protected _dynamicDisplayContainer: ViewContainerRef;

  public set DynamicDisplayContainer(val: ViewContainerRef) {
    this._dynamicDisplayContainer = val;
  }

  public get DynamicDisplayContainer(): ViewContainerRef {
    return this._dynamicDisplayContainer;
  }

  constructor() {
    this.OnDynamicComponentError = new Subject<boolean>();
   }

   public DynamicComponentError(val: boolean): void {
     this.OnDynamicComponentError.next(val);
   }
}
