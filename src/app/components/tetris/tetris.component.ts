import {Component, inject} from '@angular/core';
import {GameStatus, TetrisServiceService} from '../../service/tetris-service.service';
import {TetrisType} from '../../models/tetris-model';
import {screenSize, TileServiceService} from '../../service/tile-service.service';


@Component({
  selector: 'app-tetris',
  imports: [],
  templateUrl: './tetris.component.html',
  styleUrl: './tetris.component.css'
})
export class TetrisComponent {
  tService = inject(TetrisServiceService)
  tileService = inject(TileServiceService)
  gameWidthSize = 150

  constructor() {
    let size = this.tileService.getScreenSize()
    this.setPieceSize(size)
    this.gameWidthSize = this.getTetrisWidth()
    window.addEventListener('resize', ()=> {
      this.gameWidthSize = this.getTetrisWidth()
      console.log(this.gameWidthSize)
    })
  }

  setPieceSize(size:screenSize){
      switch(size){
        case screenSize.mobile:
          this.gameWidthSize =  90;
          break;
        case screenSize.tablet:
          this.gameWidthSize = 120;
          break;
        default:
          this.gameWidthSize = 150;

      }
    }

  protected readonly TetrisType = TetrisType;
  protected readonly GameStatus = GameStatus;

  getwidth(gameGrid: HTMLDivElement) {
    let width = gameGrid.clientWidth;
    return width/10;
  }

  getSideWindowSize(){
    let size =  this.getTetrisWidth()
    return size/2 - 50;
  }


  getScreenSize():screenSize {
    if (window.innerWidth < 641) {
      return screenSize.mobile;
    } else if (window.innerWidth < 1025) {
      return screenSize.tablet;
    } else {
      return screenSize.desktopLarge;

    }
  }

  getTetrisWidth() {
    let size = this.getScreenSize();
    switch(size){
      case screenSize.mobile:
        return 200;
      case screenSize.tablet:
        return 300;
      default:
        return 400;
    }
  }


  showClickEffect(event: MouseEvent|TouchEvent , key:string) {
    let target = event.target as HTMLElement;
    this.tService.keyDownAction(key.toLowerCase())
    target.classList.add('click-action');
    setTimeout(() => {
      target.classList.remove('click-action');
    }, 200)
  }

  touchStart(){
    this.tService.keyDownAction(' '.toLowerCase());
  }

  touchLeave(){
    this.tService.keyUpAction(' '.toLowerCase());
  }
}
