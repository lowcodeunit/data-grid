import { DynamicComponentService } from './../../services/dynamic-component.service';
import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DynamicComponentModel } from '../../models/dynamic-component.model';

@Component({
  selector: 'lcu-dynamic-container',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit, AfterViewInit  {

  // private _viewContainer: ViewContainerRef;

  @ViewChild('container', { read: ViewContainerRef, static: false })
  set viewContainer(content: ViewContainerRef) {
    if (content) {
      this.renderComponent(0, content);
    }
  }

  private _dynamicComponents: Array<DynamicComponentModel>;
  // tslint:disable-next-line:no-input-rename
  @Input('dynamic-components')
  set DynamicComponents(val: Array<DynamicComponentModel>) {
    if (!val) { return; }
    debugger;
    this._dynamicComponents = val;
    this.dynamicComponentService.DynamicComponents = val;
   // this.renderComponent(0, this.viewContainer);
  }

  get DynamicComponents(): Array<DynamicComponentModel> {
    return this._dynamicComponents;
  }

// private _dynamicViewContainer: ViewContainerRef;

// @Input('dynamic-view-container')
// set DynamicViewContainer(val: ViewContainerRef) {
//   if (!val) { return; }

//   this._dynamicViewContainer = val;
//   this.renderComponent(0);
// }

// get DynamicViewContainer(): ViewContainerRef {
//   return this._dynamicViewContainer;
// }

  // @ViewChild('container', {read: ViewContainerRef, static: false})
  // protected viewContainer: ViewContainerRef;

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected dynamicComponentService: DynamicComponentService
    ) { }

  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    // this.renderComponent(0);
  }

  protected renderComponent(index: number, container: ViewContainerRef) {
    debugger;
    if (!this.dynamicComponentService.DynamicComponents || !container) {
      return;
    }

    // factory for creating a dynamic component
    const factory: ComponentFactory<any> = this.componentFactoryResolver
    .resolveComponentFactory(this.dynamicComponentService.DynamicComponents[index].Component);

    // component created by a factory
    const componentRef: ComponentRef<any> = container.createComponent(factory);
   // const componentRef: ComponentRef<any> = this.DynamicViewContainer.createComponent(factory);

    // current component instance
    const instance: DynamicComponent = componentRef.instance as DynamicComponent;

    // find the current component in TabComponents and set its data
    this.dynamicComponentService.DynamicComponents.find((comp: DynamicComponentModel) => {
      if (comp.Component.name === instance.constructor.name) {
        instance['Data'] = comp.Data;
      }
    });
}

}
