import {
  Directive, Input, OnDestroy, OnInit, OnChanges, SimpleChanges,
  ViewContainerRef, ComponentRef, Type
} from '@angular/core';
import { Dynamic } from '../models/dynamic';

@Directive({
  selector: '[appDynamicLoader]'
})
export class DynamicLoaderDirective implements OnInit, OnDestroy, OnChanges {
  @Input() component: Type<Dynamic> | undefined;
  @Input() Data: any;
  @Input() tests: any;

  private componentRef: ComponentRef<Dynamic> | null = null;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.renderComponent();
  }

  ngOnChanges(changes: SimpleChanges) {

      this.renderComponent();

  }

  private renderComponent() {

    if (this.componentRef) {
      this.viewContainerRef.clear();
      this.componentRef.destroy();
      this.componentRef = null;
    }


    if (this.component) {
      this.componentRef = this.viewContainerRef.createComponent<Dynamic>(this.component);
      if (this.componentRef.instance && this.Data) {
        this.componentRef.instance.Data = this.Data;
      }
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.viewContainerRef.clear();
  }
}
