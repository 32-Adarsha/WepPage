import {AfterViewInit, Component, inject} from '@angular/core';
import {PreferenceService} from '../../service/preference.service';
import VanillaTilt from 'vanilla-tilt';


@Component({
  selector: 'app-big-certificate',
  imports: [],
  templateUrl: './big-certificate.component.html',
  styleUrl: './big-certificate.component.css'
})
export class BigCertificateComponent implements AfterViewInit {
    preferService = inject(PreferenceService)

  ngAfterViewInit(): void {
    VanillaTilt.init(document.getElementById("certificate")!, {
      max: 10,
      speed: 200
    });
  }
}
