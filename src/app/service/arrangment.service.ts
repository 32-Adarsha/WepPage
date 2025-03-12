import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {TileServiceService} from './tile-service.service';


// types and field

type position = {
  x: number,
  y: number,
}
export enum tileType {
  small,
  vertical,
  horizontal,
  big,
  xl,
}
type tile = {
  position: position,
  index : number[],
  type : tileType,
}


@Injectable({
  providedIn: 'root'
})
export class ArrangementService {
  allTiles: tile[] = [];
  tiles: WritableSignal<tile[]> = signal([]);
  tileService = inject(TileServiceService);
  occupiedSpace:number[] = []

  constructor() {
    let tileTypeArray:tileType[] = [tileType.small , tileType.horizontal , tileType.vertical , tileType.big , tileType.xl]
    for (let i = 0; i < 10; i++) {
      let randomTileType = Math.floor(Math.random()*tileTypeArray.length);
      let newTile = {
        position: {
          x: 0,
          y: 0,
        },
        index: [i],
        type: randomTileType,

      }
      this.tiles().push(newTile);

    }

    this.rearrangeTiles()
  }

  get2DArray(pos: number):position {
    return {
      y: Math.floor(pos / this.tileService.state().countColumn) * this.tileService.state().tileSize ,
      x: Math.floor(pos % this.tileService.state().countColumn) * this.tileService.state().tileSize
    }
  }


  snapTile(pevPos:position,currPos: position , idList:number , pos:number[] , type : tileType) {
    let newTiles = this.tiles()
    let newPos =  this.nearestPosition(currPos)
    let item_positions = this.getTileOccupancy(type , newPos)
    if(this.isOccupied(item_positions)){
      newTiles[idList].position = pevPos
      this.addPosition(newTiles[idList].index)
    } else {
      newTiles[idList].position = newPos;
      newTiles[idList].index = item_positions;
      this.updatePosition(pos ,item_positions )
    }
    this.tiles.set(newTiles);
  }

  nearestPosition(pos: position): position {
    return {
      x: Math.round(pos.x / this.tileService.state().tileSize) * this.tileService.state().tileSize,
      y: Math.round(pos.y / this.tileService.state().tileSize) * this.tileService.state().tileSize,
    }
  }

  get1D_pos(pos:position):number {
    return (Math.round(pos.x / this.tileService.state().tileSize) + (Math.round(pos.y / this.tileService.state().tileSize) * this.tileService.state().countColumn));
  }

  isOccupied(pos:number[]): boolean {
    for(let i = 0; i < pos.length; i++) {
      if(this.occupiedSpace.includes(pos[i])){
        return true;
      }
    }
    return false;
  }

  updatePosition(prevPos:number[] , newPos:number[]) {
    this.addPosition(newPos);
    this.removePosition(prevPos)
  }

  addPosition(pos:number[]) {
    pos.forEach(item => {
      this.occupiedSpace.push(item)
    })
  }

  removePosition(pos:number[]){
    this.occupiedSpace = this.occupiedSpace.filter(item => !pos.includes(item));
  }

  rearrangeTiles():void {
    this.occupiedSpace = []
    let tempTiles: tile[] = this.tiles()
    let readableTiles: tile[] = []
    let counter = 0;
    let numElement = this.tileService.state().countColumn * this.tileService.state().countRow;
    for(let i = 0; i < numElement; i++) {
      counter = 0
      let canPlace = false;
      while(counter < tempTiles.length && !canPlace) {
        let element = tempTiles[counter]
        let occupancy = this.getTileOccupancy(element.type , this.get2DArray(i))
        if (!this.isOccupied(occupancy) && !this.overFlows(element.type , i)){
          element.position = this.get2DArray(i)
          element.index = occupancy
          readableTiles.push(element);
          this.pushToOccupied(occupancy)
          tempTiles = tempTiles.filter(item => item !== element)
          canPlace = true;
          break;
        }

        counter++
      }


    }

    this.tiles.set(readableTiles);


  }

  pushToOccupied(pos:number[]){
    pos.forEach(item => {
      this.occupiedSpace.push(item)
    })
  }

  overFlows(type:tileType , pos:number):boolean{
    switch(type){
      case tileType.big:
        return this.isRightEdge(pos) || this.isBottomEdge(pos);
      case tileType.horizontal:
        return this.isRightEdge(pos)
      case tileType.vertical:
        return this.isBottomEdge(pos)
      case tileType.xl:
        return this.isDoubleRightEdge(pos) || this.isBottomEdge(pos)
      default:
        return false;
    }
  }

  isRightEdge(pos:number){
    return (pos+1) % this.tileService.state().countColumn == 0;
  }

  isBottomEdge(pos:number){
    let i_th_row = Math.floor(pos / this.tileService.state().countColumn) + 1;
    return i_th_row == this.tileService.state().countRow;
  }

  isDoubleRightEdge(pos:number){
    return (pos+1) % this.tileService.state().countColumn == 0 || (pos+1) % this.tileService.state().countColumn == this.tileService.state().countColumn-1;
  }

  getTileOccupancy(type:tileType , pos:position):number[] {
    switch (type) {
      case tileType.small:
        return [this.get1D_pos(pos)]
      case tileType.horizontal:
        return [this.get1D_pos(pos), this.get1D_pos({x:pos.x + this.tileService.state().tileSize,y:pos.y})]
      case tileType.vertical:
        return [this.get1D_pos(pos) ,  this.get1D_pos({x:pos.x , y: pos.y + this.tileService.state().tileSize})]
      case tileType.big:
        return [
          this.get1D_pos(pos),
          this.get1D_pos({x:pos.x + this.tileService.state().tileSize,   y:pos.y}),
          this.get1D_pos({x:pos.x , y: pos.y + this.tileService.state().tileSize}),
          this.get1D_pos({x:pos.x + this.tileService.state().tileSize, y: pos.y + this.tileService.state().tileSize})
        ]
      default:
        return [
          this.get1D_pos(pos),
          this.get1D_pos({x:pos.x + this.tileService.state().tileSize,   y:pos.y}),
          this.get1D_pos({x:pos.x , y: pos.y + this.tileService.state().tileSize}),
          this.get1D_pos({x:pos.x + this.tileService.state().tileSize, y: pos.y + this.tileService.state().tileSize}),
          this.get1D_pos({x:pos.x + (2*this.tileService.state().tileSize),   y:pos.y}),
          this.get1D_pos({x:pos.x + (2*this.tileService.state().tileSize), y: pos.y + this.tileService.state().tileSize}),
        ]
    }
  }




















}
