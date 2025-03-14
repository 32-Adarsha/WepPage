import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-tile',
  imports: [],
  templateUrl: './profile-tile.component.html',
  styleUrl: './profile-tile.component.css'
})
export class ProfileTileComponent {

  router = inject(Router);

}
