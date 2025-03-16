import {Injectable, signal, WritableSignal} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  certificate : WritableSignal<string> = signal('./images/coursera.png')
  constructor() { }


  selectCertificate(image:string){
      this.certificate.set(image)
  }
}
