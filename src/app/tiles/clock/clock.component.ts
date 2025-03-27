import {Component, inject} from '@angular/core';
import {screenSize, TileServiceService} from '../../service/tile-service.service';

enum ClockPointer {
  hour,
  minute,
  second
}


@Component({
  selector: 'app-clock',
  imports: [],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent {
  currentTime = Date.now();
  date = new Date(this.currentTime);
  hour:number = this.date.getHours();
  minutes = this.date.getMinutes();
  seconds = this.date.getSeconds();

  tileService = inject(TileServiceService)


  getHoursAngle(){
    const total = this.hour*60*60 + this.minutes*60 + this.seconds;
    return (((total/(12*60*60)) * 360) - 90) % 360 + "deg";

  }
  getMinuteAngle(){
    const total =  this.minutes*60 + this.seconds;
    return (((total/(60*60)) * 360) - 90 ) % 360 + "deg";
  }

  getSecondsAngle(){
    return (((this.seconds/60) * 360) - 90) %360 + "deg";
  }

  getSize(type:ClockPointer){
    switch(type){
      case ClockPointer.hour:
        return this.tileService.state().screen_size == screenSize.mobile ? 25 : 40;
      case ClockPointer.minute:
        return this.tileService.state().screen_size == screenSize.mobile ? 30: 50;
      default:
        return this.tileService.state().screen_size == screenSize.mobile ? 32 : 52;
    }
  }

  getHeight(type:ClockPointer){
    switch(type){
      case ClockPointer.hour:
        return this.tileService.state().screen_size == screenSize.mobile ? 6 : 10;
      case ClockPointer.minute:
        return this.tileService.state().screen_size == screenSize.mobile ? 4 : 5;
      default:
        return this.tileService.state().screen_size == screenSize.mobile ? 2 : 3;
    }
  }

  protected readonly ClockPointer = ClockPointer;
}
