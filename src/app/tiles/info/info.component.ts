import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import Typewriter from 't-writer.js'

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent  implements AfterViewInit , OnInit {
  @Input() Data:any = undefined
  id = 'writer'
  writer: any;
  bot_answer  = [":) Hi, Fellow Explorer , You are Welcome to my Site",
  "Did you know you can drag and drop the tile ? *:O)"]


  ngAfterViewInit(): void {
    let target = document.getElementById(this.id)!
    this.writer = new Typewriter(target, {
      loop: false,
      typeColor: 'black'
    })

    this.addDialogs(this.bot_answer)
  }

  addDialogs(dialogs:string[]){

    if(this.writer){
      this.writer.clearQueue()
      dialogs.forEach(element => {
        this.writer.type(element).rest(600).clear()
      })

      this.writer.then(()=>{console.log("dialogs")})
      this.writer.type("Enjoy ;)")
    }

    this.writer.start()
  }





  ngOnInit(): void {
    this.id = 'writer ' + Math.floor(Math.random()*100000).toString()
  }



}
