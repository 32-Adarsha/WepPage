import {Injectable, signal, WritableSignal} from '@angular/core';


enum uType {
  old= "old" ,
  newU = "nes"
}

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  certificate : WritableSignal<string> = signal('./images/coursera.png')

  constructor() {
    let data = localStorage.getItem("newUser");
    if(data){

    }
  }


  selectCertificate(image:string){
      this.certificate.set(image)
  }
}
