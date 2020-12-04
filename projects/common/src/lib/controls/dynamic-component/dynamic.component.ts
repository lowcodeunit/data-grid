import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DynamicComponentModel } from '../../models/dynamic-component.model';
import { DynamicComponentService } from './../../services/dynamic-component.service';

@Component({
  selector: 'lcu-dynamic-container',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit, OnDestroy  {

  @ViewChild('DynamicDisplayContainer', { read: ViewContainerRef, static: false })
  protected set dynamicDisplayContainer(content: ViewContainerRef) {
    if (content) {
      this.dynamicComponentService.DynamicDisplayContainer = content;
      this.renderComponent();
    }
  }

  // tslint:disable-next-line:no-input-rename
  @Input('dynamic-components')
  set DynamicComponents(val: Array<DynamicComponentModel>) {
    if (!val) {
      return;
    }

    this.dynamicComponentService.DynamicComponents = val;
  }

  public ComponentError: boolean;

  protected componentErrorSubscription: Subscription;

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected dynamicComponentService: DynamicComponentService
    ) { }

  public ngOnInit(): void {

    this.componentErrorSubscription = this.dynamicComponentService.OnDynamicComponentError
    .subscribe((res: boolean) => {
      if (!res) { return; }

      this.ComponentError = res;
    });
  }

  public ngOnDestroy(): void {
    this.componentErrorSubscription.unsubscribe();
  }

  /**
   * Render the selected dynamic component
   *
   * @param index position in array to target
   */
  protected renderComponent(index: number = 0) {
    if (!this.dynamicComponentService.DynamicComponents ||
        !this.dynamicComponentService.DynamicDisplayContainer ||
        !this.arrayHasIndex(this.dynamicComponentService.DynamicComponents, index)) {
      return;
    }

    // factory for creating a dynamic component
    const factory: ComponentFactory<any> = this.componentFactoryResolver
    .resolveComponentFactory(this.dynamicComponentService.DynamicComponents[index].Component);

    // component created by a factory
    const componentRef: ComponentRef<any> =
        this.dynamicComponentService.DynamicDisplayContainer.createComponent(factory);

    // current component instance
    const instance: DynamicComponent = componentRef.instance as DynamicComponent;

    // find the current component in TabComponents and set its data
    this.dynamicComponentService.DynamicComponents.find((comp: DynamicComponentModel) => {
      if (comp.Component.name === instance.constructor.name) {
        instance['Data'] = comp.Data;
      }
    });
  }

  /**
   * Check if array has an index positon
   *
   * @param array array to check
   * @param index index postion to test for
   */
  protected arrayHasIndex(array: Array<DynamicComponentModel>, index: number): boolean {
    return Array.isArray(array) && array.hasOwnProperty(index)

    // this.dynamicComponentService.DynamicComponentError(true);
    // return false;
  }
}
