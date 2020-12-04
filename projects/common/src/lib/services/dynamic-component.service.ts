import { Injectable } from '@angular/core';
import { DynamicComponentModel } from '../models/dynamic-component.model';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {

  public DynamicComponents: Array<DynamicComponentModel>;

  constructor() { }
}
