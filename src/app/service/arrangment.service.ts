import {inject, Injectable, signal, Type, WritableSignal} from '@angular/core';
import {TileServiceService} from './tile-service.service';
import {single} from 'rxjs';
import {DataService} from './data.service';
import {Dynamic} from '../models/dynamic';
import {CalenderComponent} from '../tiles/calender/calender.component';
import {ClockComponent} from '../tiles/clock/clock.component';
import {ProfileTileComponent} from '../tiles/profile-tile/profile-tile.component';
import {TicTacToeComponent} from '../tiles/tic-tac-toe/tic-tac-toe.component';
import {TetrisComponent} from '../tiles/tetris/tetris.component';
import {CertificateComponent} from '../tiles/certificate/certificate.component';
import {SocialmediaComponent} from '../tiles/socialmedia/socialmedia.component';
import {WeatherComponent} from '../tiles/weather/weather.component';
import {QuoteComponent} from '../tiles/quote/quote.component';
import {InfoComponent} from '../tiles/info/info.component';
import {BigInfoComponent} from '../tiles/big-info/big-info.component';


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
  component:Type<any>
  position: position,
  index : number[],
  type : tileType,
  zIndex: number,
  data:any

}


@Injectable({
  providedIn: 'root'
})
export class ArrangementService {
  allTile:tile[] = []
  displayTiles : WritableSignal<tile[][]> = signal([])
  tiles: WritableSignal<tile[]> = signal([]);
  tileService = inject(TileServiceService);
  dataService = inject(DataService);
  occupiedSpace:number[][] = []




  constructor() {

    let components = [BigInfoComponent,InfoComponent,InfoComponent,QuoteComponent,ClockComponent,WeatherComponent,SocialmediaComponent ,SocialmediaComponent, SocialmediaComponent,CalenderComponent , TicTacToeComponent , ProfileTileComponent , TetrisComponent , CertificateComponent ,CertificateComponent ];
    let type_array = [tileType.big,tileType.horizontal,tileType.horizontal , tileType.horizontal , tileType.small , tileType.big, tileType.small , tileType.small,tileType.small , tileType.small ,tileType.small, tileType.vertical , tileType.small , tileType.xl ,  tileType.xl ];
    let component_data = ["test" ,{"msg":'Some Tiles Can Open New Page Like Game and Profile' , 'color':"bg-red-300"},{'msg':'Hi, Check out my Site you can drag and Drop' , 'color':"bg-blue-300"},undefined,undefined  ,undefined,{media:"resume"},{media:"linkedin"},{media:"github"}, undefined , undefined , undefined , undefined ,  './images/coursera.png' , './images/microsoft.png'];
    for (let i = 0; i < components.length; i++) {

      let newTile = {
        position: {
          x: 0,
          y: 0,
        },
        component : components[i],
        index: [i],
        type: type_array[i],
        zIndex: 0,
        data:component_data[i],


      }
      this.allTile.push(newTile);

    }


    this.setTileInWindow()
  }

  get2DArray(pos: number):position {
    return {
      y: Math.floor(pos / this.tileService.state().countColumn) * this.tileService.state().tileSize ,
      x: Math.floor(pos % this.tileService.state().countColumn) * this.tileService.state().tileSize
    }
  }


  snapTile(pevPos:position,currPos: position , idList:number , pos:number[] , type : tileType , window:number) {
    let newTiles = this.tiles()
    let newPos =  this.nearestPosition(currPos)
    let item_positions = this.getTileOccupancy(type , newPos)
    let dimension = this.getDimension()
    if(this.isOccupied(item_positions , window)){
      newTiles[idList].position = pevPos
      this.addPosition(newTiles[idList].index , window)
    } else {
      newTiles[idList].position = newPos;
      newTiles[idList].index = item_positions;
      this.updatePosition(pos ,item_positions , window )

      // need to turn this on later
      //this.dataService.saveData<tile[][]>(dimension, this.displayTiles())
      //this.dataService.saveData<number[][]>(dimension+"_o" , this.occupiedSpace)
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

  isOccupied(pos:number[] , window:number): boolean {
    for(let i = 0; i < pos.length; i++) {
      if(this.occupiedSpace[window].includes(pos[i])){
        return true;
      }
    }
    return false;
  }

  updatePosition(prevPos:number[] , newPos:number[] , window:number) {
    this.addPosition(newPos , window);
    this.removePosition(prevPos , window);
  }

  addPosition(pos:number[] , window:number) {
    pos.forEach(item => {
      this.occupiedSpace[window].push(item)
    })
  }

  removePosition(pos:number[] , window:number) {
    this.occupiedSpace[window] = this.occupiedSpace[window].filter(item => !pos.includes(item));
  }

  setTileInWindow(){
    let dimension = this.getDimension()
    // if(this.dataService.getData<tile[][]>(dimension) != null){
    //   this.displayTiles.set(this.dataService.getData<tile[][]>(dimension)!)
    //   this.occupiedSpace = this.dataService.getData<number[][]>(dimension+"_o")!
    // } else {
      let temp_tiles = this.allTile;
      let count = 0
      this.displayTiles.set([])
      this.occupiedSpace = []
      while (temp_tiles.length > 0) {
        this.occupiedSpace.push([])
        let result = this.rearrangeTiles(temp_tiles, this.occupiedSpace.length - 1);
        this.displayTiles().push(result.set)
        temp_tiles = result.left

        count++
      //}

      let new_windows_tile = this.displayTiles()
      this.displayTiles.set(new_windows_tile)

      //this.dataService.saveData<tile[][]>(dimension, new_windows_tile)
      //this.dataService.saveData<number[][]>(dimension+"_o" , this.occupiedSpace)
    }

  }

  getDimension(){
    return this.tileService.state().countColumn.toString() + this.tileService.state().countRow.toString()
  }



  rearrangeTiles(tiles:tile[] , window:number):{set:tile[] , left:tile[]} {
    let tempTiles: tile[] = tiles
    let readableTiles: tile[] = []
    let counter = 0;
    let numElement = this.tileService.state().countColumn * this.tileService.state().countRow;
    for(let i = 0; i < numElement; i++) {
      counter = 0
      let canPlace = false;
      while(counter < tempTiles.length && !canPlace) {
        let element = tempTiles[counter]
        let occupancy = this.getTileOccupancy(element.type , this.get2DArray(i))

        if (!this.isOccupied(occupancy , window) && !this.overFlows(element.type , i)){

          element.position = this.get2DArray(i)
          element.index = occupancy
          readableTiles.push(element);
          this.pushToOccupied(occupancy , window);
          tempTiles = tempTiles.filter(item => item !== element)
          canPlace = true;
          break;
        }

        counter++
      }


    }

    this.tiles.set(readableTiles);

    return {
      set : readableTiles,
      left : tempTiles,
    }

  }

  pushToOccupied(pos:number[] , window:number){
    pos.forEach(item => {
      this.occupiedSpace[window].push(item)
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

  changeZIndex(window:number , idx:number , layer:number){
    let tempTiles = this.displayTiles()[window]
    tempTiles[idx].zIndex = layer
    this.tiles.set(tempTiles)
  }




















}
