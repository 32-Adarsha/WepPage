import {Component, inject, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PopWindowService} from '../../service/pop-window.service';

@Component({
  selector: 'app-img-wrapper',
  imports: [],
  templateUrl: './img-wrapper.component.html',
  styleUrl: './img-wrapper.component.css'
})
export class ImgWrapperComponent implements OnInit {
  @Input() Data:any
  route = inject(Router)
  icon_link = ''
  routeTo =''
  popService = inject(PopWindowService)

  ngOnInit(): void {
    if(this.Data){
      this.icon_link = this.Data.imgSource;
      this.routeTo = this.Data.route;
    }
  }


}
