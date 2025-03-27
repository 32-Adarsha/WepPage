import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import Typewriter from 't-writer.js'



@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit {
  @Input() Data:any = undefined
  value = ""
  color = ""

  ngOnInit(): void {
    if(this.Data){
      this.value = this.Data.value
      this.color = this.Data.color
    }
  }

}
