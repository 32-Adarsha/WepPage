import {Injectable, WritableSignal, signal} from '@angular/core';




export enum screenSize {
  desktopLarge = 1,
  tablet = 3,
  mobile = 4,
}

@Injectable({
  providedIn: 'root'
})
export class TileServiceService {
  currentWindow: WritableSignal<number> = signal(0)

  state: WritableSignal<{
    paddingHorizontal: number;
    paddingVertical: number;
    screen_size: screenSize;
    tileSize: number;
    widthScreen: number;
    heightScreen: number;
    constPadding: number;
    countRow: number;
    countColumn: number;
  }> = signal({
    paddingHorizontal: 0,
    paddingVertical: 0,
    screen_size: screenSize.desktopLarge,
    tileSize: 150,
    widthScreen: window.innerWidth ,
    heightScreen: window.innerHeight,
    constPadding: 30,
    countRow: 0,
    countColumn: 0,
  });





  constructor() {
      this.resetSize()
  }

  onScroll(event:Event){
    let elm = event.target as HTMLElement;
    this.currentWindow.set( Math.round(elm.scrollLeft / elm.offsetWidth));
  }

  async resetSize() {
    // updating the screen width based on the size
    this.state().widthScreen = window.innerWidth;
    this.state().heightScreen = window.innerHeight;

    switch(this.getScreenSize()){
      case screenSize.desktopLarge:
        this.setSize(150);
        break
      case screenSize.tablet:
        this.setSize(120);
        break
      default:
        this.setSize(100);
    }

    let newState = this.state();
    this.state.set(newState)


  }

  getHorizontalPadding(width: number , size:number): number {
    if(window.innerWidth < 641){
      return 25;
    }
    else{
      return ((width- (Math.floor(width / size) * size)) / 2 ) + this.state().constPadding
    }

  }

  setSize(size:number){
    let width = window.innerWidth- (2*this.state().constPadding);
    let height = window.innerHeight - (2*this.state().constPadding);
    this.state().countColumn = Math.floor(width / size);
    this.state().countRow = Math.floor(height / size);
    this.state().paddingHorizontal = this.getHorizontalPadding(width, size);
    this.state().paddingVertical = ((height -(Math.floor(height/ size) * size)) / 2) + this.state().constPadding;
    this.state().tileSize =  size;
  }

  getScreenSize():screenSize{
    if(window.innerWidth < 641){
      this.state().screen_size = screenSize.mobile;
      this.state().constPadding = 15;
      return this.state().screen_size;
    }
    else if(window.innerWidth < 1025){
      this.state().screen_size = screenSize.tablet;
      this.state().constPadding = 30;
      return this.state().screen_size;
    }
    else{
      this.state().screen_size = screenSize.desktopLarge;
      this.state().constPadding = 30;
      return this.state().screen_size;
    }
  }













}
