import {AfterViewInit, Component, inject, OnChanges} from '@angular/core';
import {TileServiceService} from '../../service/tile-service.service';
import {CdkDrag, CdkDragDrop, CdkDragRelease} from '@angular/cdk/drag-drop';
import {ArrangementService, tileType} from '../../service/arrangment.service';




enum mouseAction {
  down,
  up,
  click,
}




@Component({
  selector: 'app-window',
  imports: [
    CdkDrag
  ],
  templateUrl: './window.component.html',
  styleUrl: './window.component.css'
})
export class WindowComponent implements AfterViewInit {
  isScrolling : any;
  isResizeS:any;
  isAnimation:any;
  totalElement : number = 0;

  tileService:TileServiceService = inject(TileServiceService);
  arrangService:ArrangementService = inject(ArrangementService);


  ngAfterViewInit(): void {
    // need to destroy event listener.
    // scroll event listener
    let elm = document.getElementById('xWindow')!;
    elm.addEventListener('scroll', (event) => {
        clearTimeout(this.isScrolling);
        this.isScrolling = setTimeout(() => this.tileService.onScroll(event), 1)
      }
    );

    // event listener for resize
    window.addEventListener('resize' , (event) => {
      clearTimeout(this.isResizeS);
      this.isResizeS = setTimeout(() => {
        this.tileService.resetSize()
        // this.arrangService.reorderTiles()
        this.arrangService.setTileInWindow()
      } , 100)
    })

  }
  constructor() {
    this.totalElement = this.tileService.state().countRow * this.tileService.state().countColumn;
  }
  onRelease(event:CdkDragRelease , idList:number , pos:number[] , type:tileType , window:number) {
    let dropElement = event.source.element.nativeElement;

    const rect = dropElement.getBoundingClientRect();
    let currPost =  {
      x: rect.left - this.tileService.state().paddingHorizontal,
      y: rect.top - this.tileService.state().paddingVertical
    };

    this.arrangService.snapTile(event.source.getFreeDragPosition() , currPost , idList , pos , type , window);
  }
  getTileSize(type : tileType) {
    switch(type) {
      case tileType.big:
        return {
          "width": this.tileService.state().tileSize * 2 ,
          "height": this.tileService.state().tileSize * 2
        };
      case tileType.horizontal:

        return {
          "width": this.tileService.state().tileSize * 2,
          "height": this.tileService.state().tileSize
        };
      case tileType.vertical:
        return {
          "width": this.tileService.state().tileSize ,
          "height": this.tileService.state().tileSize * 2
        };
      case tileType.xl:
        return {
          "width": this.tileService.state().tileSize*3 ,
          "height": this.tileService.state().tileSize * 2
        };
      default:
        return {
          "width": this.tileService.state().tileSize,
          "height": this.tileService.state().tileSize
        };
    }
  }
  onDragStart(pos: number[] , window:number) {
    this.arrangService.removePosition(pos , window);

  }

  onMouseDown(event: MouseEvent|TouchEvent , window:number , idx:number ) {
    let target = event.target as HTMLElement;
    clearTimeout(this.isAnimation);
    this.isAnimation = setTimeout(() => {
      target.classList.add('pop-animation');
      this.arrangService.changeZIndex(window , idx , 100)
    } , 400)

  }


  onMouseUp(event: MouseEvent|TouchEvent , window:number , idx:number) {
    let target = event.target as HTMLElement;
    clearTimeout(this.isAnimation);
    target.classList.remove('pop-animation');
    this.arrangService.changeZIndex(window,idx, 0)
  }

  getLeftPosition(idx: number) {
    return idx*100;
  }

  protected readonly Array = Array;
  protected readonly console = console;
}
