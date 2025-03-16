import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tetris',
  imports: [],
  templateUrl: './tetris.component.html',
  styleUrl: './tetris.component.css'
})
export class TetrisComponent {
  route = inject(Router)
}
