import {AfterViewInit, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ApiServiceService} from '../../service/api-service.service';

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements AfterViewInit {
  apiService = inject(ApiServiceService)
  lat  = 37.215519
  lng:number = -93.292358
  temp:number = 0
  uv:number = 0
  wind_mph = 14.5
  humidity = 1
  apiUrl:string = 'https://weatherapi-com.p.rapidapi.com/current.json';
  response = {}
  icon:WritableSignal<string> = signal('')

  ngAfterViewInit(): void {
    this.sendRequest()
  }

  async sendRequest() {
    let params = {
      q: `${this.lat},${this.lng}`,
    }
    let header =  {
      'x-rapidapi-key': '57d6e47713msh5c49bbb509b7420p155099jsn66b55501b6fb',
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
    }
    let url = ''
    let response = await this.apiService.makeApiCall(params , header ,this.apiUrl )

    this.temp = response.current.temp_f
    this.icon.set('https:'+response.current.condition.icon)
  }




}
