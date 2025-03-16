import {AfterViewInit, Component, Input} from '@angular/core';
import {Dynamic} from '../../models/dynamic';

@Component({
  selector: 'app-certificate',
  imports: [],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent implements AfterViewInit {
  @Input() Data: any = undefined;

  ngAfterViewInit(): void {

  }



}
