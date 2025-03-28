import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  saveData(id:string,data:any){

    localStorage.setItem(id,JSON.stringify(data));

  }

  getData(id: string) {
    let data = localStorage.getItem(id);

    if (data) {
      return JSON.parse(data)
    }
    return null;
  }


}
