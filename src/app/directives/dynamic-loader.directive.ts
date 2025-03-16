
import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewContainerRef
} from '@angular/core';
import {Dynamic} from '../models/dynamic';


@Directive({
  selector: '[appDynamicLoader]'
})
export class DynamicLoaderDirective implements OnInit, OnDestroy , AfterViewInit {

  @Input() component: Type<Dynamic> | undefined = undefined;
  @Input() Data:any = undefined;
  constructor(private ViewContainerRef : ViewContainerRef , private elementRef : ElementRef) {

  }
  ngOnInit() {


  }
  ngOnDestroy() {
    this.ViewContainerRef.clear()
    console.log("Destroyed")
  }

  ngAfterViewInit(): void {
    if(this.component){
      const componentRef = this.ViewContainerRef.createComponent<Dynamic>(this.component)
      if (componentRef.instance && this.Data) {
        componentRef.instance.Data = this.Data;
      }
    }
    console.log(this.Data);
  }

}
