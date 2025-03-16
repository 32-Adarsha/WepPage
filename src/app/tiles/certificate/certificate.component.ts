import {AfterViewInit, Component, inject, Input} from '@angular/core';
import {Dynamic} from '../../models/dynamic';
import {Router} from '@angular/router';
import {PreferenceService} from '../../service/preference.service';

@Component({
  selector: 'app-certificate',
  imports: [],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent implements AfterViewInit {
  @Input() Data: any = undefined;
  route = inject(Router)
  preferService = inject(PreferenceService)
  ngAfterViewInit(): void {

  }

  clickAction(){
    this.route.navigate(['/certificate']);
    this.preferService.selectCertificate(this.Data)
  }





}
