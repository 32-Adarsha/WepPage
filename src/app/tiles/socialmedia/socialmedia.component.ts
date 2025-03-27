import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-socialmedia',
  imports: [],
  templateUrl: './socialmedia.component.html',
  styleUrl: './socialmedia.component.css'
})
export class SocialmediaComponent implements OnInit {
  @Input() Data:any = undefined
  icon_link = ''
  profile_link = ''



  ngOnInit(): void {
   if(this.Data){
     this.icon_link = this.Data.imgSource;
     this.profile_link =this.Data.route;
   }


  }

  goToProfile() {
    window.open(this.profile_link, '_blank');
  }
}
