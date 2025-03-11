import {AfterViewInit, Component, inject, OnChanges} from '@angular/core';
import {TileServiceService} from '../../service/tile-service.service';
import {CdkDrag, CdkDragDrop, CdkDragRelease} from '@angular/cdk/drag-drop';
import {ArrangementService} from '../../service/arrangment.service';


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
  totalElement : number = 0;

  tileService:TileServiceService = inject(TileServiceService);
  arrangService:ArrangementService = inject(ArrangementService);


  ngAfterViewInit(): void {
    // need to destroy event listener.
    // scroll event listener
    let elm = document.getElementById('xWindow')!;
    elm.addEventListener('scroll', (event) => {
        clearTimeout(this.isScrolling);
        this.isScrolling = setTimeout(() => this.tileService.onScroll(event), 100)
      }
    );

    // event listener for resize
    window.addEventListener('resize' , (event) => {
      clearTimeout(this.isResizeS);
      this.isResizeS = setTimeout(() => {
        this.tileService.resetSize()
        this.arrangService.reorderTiles()
      } , 100)
    })

  }
  constructor() {
    this.totalElement = this.tileService.state().countRow * this.tileService.state().countColumn;
  }


  onRelease(event:CdkDragRelease , idList:number , pos:number) {
    let dropElement = event.source.element.nativeElement;

    const rect = dropElement.getBoundingClientRect();
    let currPost =  {
      x: rect.left - this.tileService.state().paddingHorizontal,
      y: rect.top - this.tileService.state().paddingVertical
    };

    this.arrangService.snapTile(event.source.getFreeDragPosition() , currPost , idList , pos)
  }


}
