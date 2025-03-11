import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {TileServiceService} from './tile-service.service';


type position = {
  x: number,
  y: number,
}

type tile = {
  position: position,
  index : number,
}

enum tileType {
  small,
  vertical,
  horizontal,
  big,
}

@Injectable({
  providedIn: 'root'
})
export class ArrangementService {
  tiles: WritableSignal<tile[]> = signal([]);
  tileService = inject(TileServiceService);
  occupiedSpace:number[] = []

  constructor() {

    for (let i = 0; i < 10; i++) {
      let newTile = {
        position: {
          x: 0,
          y: 0,
        },
        index: i,
      }
      this.tiles().push(newTile);

    }

    this.reorderTiles()
  }

  reorderTiles() {
    this.occupiedSpace = []
    let newTiles: tile[] = this.tiles()
    for (let i = 0; i < this.tiles().length; i++) {
      newTiles[i].position = this.get2DArray(i)
      newTiles[i].index = i
      this.occupiedSpace.push(i)
    }

    this.tiles.set(newTiles);
  }


  get2DArray(pos: number):position {
    return {
      y: Math.floor(pos / this.tileService.state().countColumn) * this.tileService.state().tileWidth ,
      x: Math.floor(pos % this.tileService.state().countColumn) * this.tileService.state().tileWidth
    }
  }


  snapTile(pevPos:position,currPos: position , idList:number , pos:number) {
    let newTiles = this.tiles()
    let newPos =  this.nearestPosition(currPos)

    if(this.isOccupied(this.get1D_pos(newPos))){
      newTiles[idList].position = pevPos
    } else {
      newTiles[idList].position = newPos;
      newTiles[idList].index = this.get1D_pos(newPos);
      this.updatePosition(pos ,this.get1D_pos(newPos) )
    }
    this.tiles.set(newTiles);
  }

  nearestPosition(pos: position): position {
    return {
      x: Math.round(pos.x / this.tileService.state().tileWidth) * this.tileService.state().tileWidth,
      y: Math.round(pos.y / this.tileService.state().tileWidth) * this.tileService.state().tileWidth,
    }
  }

  get1D_pos(pos:position):number {
    return (Math.round(pos.x / this.tileService.state().tileWidth) + (Math.round(pos.y / this.tileService.state().tileWidth) * this.tileService.state().countColumn));
  }

  isOccupied(pos:number): boolean {
    return this.occupiedSpace.includes(pos);
  }

  updatePosition(prevPos:number , newPos:number) {
    this.occupiedSpace.push(newPos);
    this.occupiedSpace = this.occupiedSpace.filter(item => item !== prevPos);
  }
















}
