
import {ComponentRef, Directive, ElementRef, Input, OnDestroy, OnInit, Type, ViewContainerRef} from '@angular/core';
import {Dynamic} from '../models/dynamic';

@Directive({
  selector: '[appDynamicLoader]'
})
export class DynamicLoaderDirective implements OnInit, OnDestroy {

  @Input() component: Type<Dynamic> | undefined = undefined;
  constructor(private ViewContainerRef : ViewContainerRef , private elementRef : ElementRef) {

  }
  ngOnInit() {
    if(this.component){
      this.ViewContainerRef.createComponent<Dynamic>(this.component)
    }
  }
  ngOnDestroy() {
    this.ViewContainerRef.clear()
    console.log("Destroyed")
  }

}
