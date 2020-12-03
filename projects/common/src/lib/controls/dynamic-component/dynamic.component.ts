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
  selector: 'lcu-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit, AfterViewInit  {

  // tslint:disable-next-line:no-input-rename
  @Input('dynamic-components')
  public DynamicComponents: Array<DynamicComponentModel>;

  @ViewChild('dynamicComponent', {read: ViewContainerRef, static: false})
  protected viewContainer: ViewContainerRef;

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.renderComponent(0);
  }

  protected renderComponent(index: number) {
    debugger;
    if (!this.DynamicComponents) {
      return;
    }

    // factory for creating a dynamic component
    const factory: ComponentFactory<any> = this.componentFactoryResolver
    .resolveComponentFactory(this.DynamicComponents[index].Component);

    // component created by a factory
    const componentRef: ComponentRef<any> = this.viewContainer.createComponent(factory);

    // current component instance
    const instance: DynamicComponent = componentRef.instance as DynamicComponent;

    // find the current component in TabComponents and set its data
    this.DynamicComponents.find((comp: DynamicComponentModel) => {
      if (comp.Component.name === instance.constructor.name) {
        instance['Data'] = comp.Data;
      }
    });
}

}
