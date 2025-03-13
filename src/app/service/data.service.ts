import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  saveData<T>(id:string,data:T){
    localStorage.setItem(id,JSON.stringify(data));
  }

  getData<T>(id: string): T | null {
    let data = localStorage.getItem(id);
    if (data) {
      return JSON.parse(data) as T;
    }
    return null;
  }


}
