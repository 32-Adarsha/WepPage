import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  @Input() Data:any = undefined
  protected readonly document = document;
}
