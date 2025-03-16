import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-big-info',
  imports: [],
  templateUrl: './big-info.component.html',
  styleUrl: './big-info.component.css'
})
export class BigInfoComponent {
    @Input() Data: any;
}
