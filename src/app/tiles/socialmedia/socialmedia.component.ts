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
    if(this.Data.media == 'linkedin'){
      this.icon_link = "https://img.icons8.com/fluency/144/linkedin.png";
      this.profile_link = "https://www.linkedin.com/in/adarsha-kiran-khadka-53059b20b/";
    } else if(this.Data.media == 'github'){
      this.icon_link = "https://img.icons8.com/ios-filled/150/github.png";
      this.profile_link = "https://github.com/32-Adarsha?tab=repositories";
    } else if(this.Data.media == 'resume'){
      this.icon_link = "https://img.icons8.com/plasticine/200/contract-job.png";
      this.profile_link = "./file/Resume.pdf";
    }
  }

  goToProfile() {
    window.open(this.profile_link, '_blank');
  }
}
