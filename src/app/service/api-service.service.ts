import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor() { }


  async makeApiCall(param: any, header: any, url: string): Promise<any> {
    try {
      const response = await axios.get(url, {
        params: param,
        headers: header,
      });

      return response.data;

    } catch (error) {
      console.error(error);

    }
  }
}
