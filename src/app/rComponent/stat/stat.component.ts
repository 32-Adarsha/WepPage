import { Component } from '@angular/core';
import {StarPipe} from '../../pipes/star.pipe';

@Component({
  selector: 'app-stat',
  imports: [
    StarPipe
  ],
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.css'
})
export class StatComponent {
  lang = [['html' ,3] , ['css',3] , ['javascript',3] ,['typescript',3] , ['python',3] , ['kotlin',2] , ['cpp',2] , ['c',3] , ['docker',2] , ['kube',1] , ['git',3] , ['angular',3] , ['react',3]]
  soft = [['blender',1] , ['figma',2] , ['illust',2] , ['photoshop',2]]
}
