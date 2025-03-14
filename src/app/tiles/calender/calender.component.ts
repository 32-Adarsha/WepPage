import {Component, inject} from '@angular/core';
import {ToMonthPipe} from '../../pipes/to-month.pipe';
import {screenSize, TileServiceService} from '../../service/tile-service.service';

enum dateType {
  month = 'month',
  day = 'day',
}

@Component({
  selector: 'app-calender',
  imports: [
    ToMonthPipe
  ],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css'
})
export class CalenderComponent {
  currentDate:Date = new Date();
  month = this.currentDate.getMonth() + 1;
  day = this.currentDate.getDate();
  tileService = inject(TileServiceService)

  fontSize(t : dateType):number{
    switch(this.tileService.state().screen_size){
      case screenSize.desktopLarge:
        return t == dateType.day ? 50 : 24;
      case screenSize.tablet:
        return t == dateType.day ? 42:18;
      default:
        return t == dateType.day ? 30 : 12;
    }
  }

  protected readonly dateType = dateType;
}
