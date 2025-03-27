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
import {ImgWrapperComponent} from '../tiles/img-wrapper/img-wrapper.component';


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


export type tile = {
  id: string;
  component:Type<any>
  position: position,
  index : number[],
  type : tileType,
  zIndex: number,
  display:boolean,
  data:any
  name:string
  builtIn:boolean,
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

  custom_tile_component:WritableSignal<tile[]> =signal([])
  tiles_component:WritableSignal< tile[]> =signal( [
    {
      component: InfoComponent,
      position: { x: 0, y: 0 }, // Set position accordingly
      index: [0],
      type: tileType.horizontal,
      zIndex: 1,
      display:true,
      data: {value:"Welcome!" , color:"text-white"},
      name: "",
      id:"Welcome",
      builtIn:true
    },

    {
      component: QuoteComponent,
      position: { x: 2, y: 0 }, // Set position accordingly
      index: [2],
      type: tileType.horizontal,
      zIndex: 1,
      display:true,
      data: undefined,
      name:"Quote",
      id:"Quote",
      builtIn:true
    },
    {
      component: ClockComponent,
      position: { x: 3, y: 0 }, // Set position accordingly
      index: [3],
      type: tileType.small,
      zIndex: 1,
      display:true,
      data: undefined,
      name: "Clock",
      id:"Clock",
      builtIn:true
    },
    {
      component: WeatherComponent,
      position: { x: 4, y: 0 }, // Set position accordingly
      index: [4],
      type: tileType.big,
      zIndex: 1,
      display:true,
      data: undefined,
      name:"Weather",
      id:"Weather",
      builtIn:true
    },
    {
      component: SocialmediaComponent,
      position: { x: 5, y: 0 }, // Set position accordingly
      index: [5],
      type: tileType.small,
      zIndex: 1,
      display:true,
      data: { imgSource: "https://img.icons8.com/plasticine/100/resume.png" , route:"./file/Resume.pdf" },
      name: "Resume",
      id:"Resume",
      builtIn:true
    },
    {
      component: SocialmediaComponent,
      position: { x: 6, y: 0 }, // Set position accordingly
      index: [6],
      type: tileType.small,
      zIndex: 1,
      display:true,
      data: { imgSource: "https://img.icons8.com/fluency/144/linkedin.png" , route:"https://www.linkedin.com/in/adarsha-kiran-khadka-53059b20b/" },
      name:"Linkedin",
      id:"Linkedin",
      builtIn:true
    },
    {
      component: SocialmediaComponent,
      position: { x: 7, y: 0 }, // Set position accordingly
      index: [7],
      type: tileType.small,
      zIndex: 1,
      display:true,
      data: { imgSource: "https://img.icons8.com/fluency/144/github.png" , route:"https://github.com/32-Adarsha?tab=repositories" },
      name:"Github",
      id:"Github",
      builtIn:true
    },
    {
      component: CalenderComponent,
      position: { x: 8, y: 0 }, // Set position accordingly
      index: [8],
      type: tileType.small,
      zIndex: 1,
      display:true,
      data: undefined,
      name: "Calender",
      id:"Calender",
      builtIn:true
    },
    {
      component: TicTacToeComponent,
      position: { x: 9, y: 0 }, // Set position accordingly
      index: [9],
      type: tileType.small,
      zIndex: 1,
      display:true,
      data: undefined,
      name: "TicTacToe",
      id:"TicTacToe",
      builtIn:true
    },
    {
      component: ProfileTileComponent,
      position: { x: 10, y: 0 }, // Set position accordingly
      index: [10],
      type: tileType.vertical,
      zIndex: 1,
      display:true,
      data: undefined,
      name: "Profile",
      id:"Profile",
      builtIn:true
    },
    {
      component: TetrisComponent,
      position: { x: 11, y: 0 }, // Set position accordingly
      index: [11],
      display:true,
      type: tileType.small,
      zIndex: 1,
      data: undefined,
      name: "Tetris",
      id:"Tetris",
      builtIn:true
    },
    {
      component: CertificateComponent,
      position: { x: 12, y: 0 }, // Set position accordingly
      index: [12],
      display:true,
      type: tileType.xl,
      zIndex: 1,
      data: './images/coursera.png',
      name:"Machine Learning Certificate",
      id:"Machine Learning Certificate",
      builtIn:true
    },
    {
      component: CertificateComponent,
      position: { x: 13, y: 0 }, // Set position accordingly
      index: [13],
      type: tileType.xl,
      zIndex: 1,
      display:false,
      data: './images/microsoft.png',
      name: 'C# Certificate',
      id:"C# Certificate",
      builtIn:true
    },
    {
      component: ImgWrapperComponent,
      position: { x: 14, y: 0 }, // Set position accordingly
      index: [0],
      type: tileType.small,
      zIndex: 1,
      display:true,
      data: "name",
      name: "Setting",
      id:"setting",
      builtIn:true
    },
  ])





  constructor() {
    this.allTile = this.tiles_component().filter(item => item.display)
    this.setTileInWindow()
  }

  changedDisplay(){
    this.allTile = this.tiles_component().filter(item => item.display)
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

      let temp_tiles = this.allTile;
      let prev = temp_tiles.length
      this.displayTiles.set([])
      this.occupiedSpace = []
      while (temp_tiles.length > 0) {
        this.occupiedSpace.push([])
        let result = this.rearrangeTiles(temp_tiles, this.occupiedSpace.length - 1);
        this.displayTiles().push(result.set)
        temp_tiles = result.left
        let newprev = temp_tiles.length
        if (newprev == prev) {
          break
        } else {
          prev = newprev
        }
        let new_windows_tile = this.displayTiles()
        this.displayTiles.set(new_windows_tile)
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
      while(counter < tempTiles.length && !canPlace && numElement > 0) {

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
