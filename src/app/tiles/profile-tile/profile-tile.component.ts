import {AfterViewInit, Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-profile-tile',
  imports: [],
  templateUrl: './profile-tile.component.html',
  styleUrl: './profile-tile.component.css'
})
export class ProfileTileComponent implements AfterViewInit {

  router = inject(Router);

  ngAfterViewInit(): void {
    VanillaTilt.init(document.getElementById("parallax")!, {
      max: 25,
      speed: 400
    });

  }

}
