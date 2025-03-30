import {inject, Injectable, Type} from '@angular/core';
import {tile, tileType} from './arrangment.service';
import {InfoComponent} from '../tiles/info/info.component';
import {BigInfoComponent} from '../tiles/big-info/big-info.component';
import {CalenderComponent} from '../tiles/calender/calender.component';
import {ClockComponent} from '../tiles/clock/clock.component';
import {ImgWrapperComponent} from '../tiles/img-wrapper/img-wrapper.component';
import {ProfileTileComponent} from '../tiles/profile-tile/profile-tile.component';
import {QuoteComponent} from '../tiles/quote/quote.component';
import {SocialmediaComponent} from '../tiles/socialmedia/socialmedia.component';
import {TetrisComponent} from '../tiles/tetris/tetris.component';
import {TicTacToeComponent} from '../tiles/tic-tac-toe/tic-tac-toe.component';
import {WeatherComponent} from '../tiles/weather/weather.component';
import {DataService} from './data.service';
import {CertificateComponent} from '../tiles/certificate/certificate.component';





 type saveTileType = {
  id: string;
  component:string
  position: { x:number , y:number },
  index : number[],
  type : tileType,
  zIndex: number,
  display:boolean,
  data:any,
  name:string,
  builtIn:boolean,
}


type dataSave =  {
  cTile : Map<string , {all:saveTileType[] , d:saveTileType[][] ,o:number[][]}>
}

@Injectable({
  providedIn: 'root'
})
export class LocalsaveService {


  constructor() { }
  dService = inject(DataService)
  saveData(dimension:string ,all:tile[], d:tile[][] , o2:number[][]) {

    let data = this.dService.getData('gridLocal')

    if(data){
      let neMap = new Map(data);
        let newValue = d.map((value ) => {
          return value.map(value2=>{
            return this.convertToSaveTile(value2)
          })
        })

      let newT1 = all.map((value ) => {
        return this.convertToSaveTile(value)
      })

        neMap.set(dimension,{all:newT1 ,d:newValue ,o:o2})

        this.dService.saveData('gridLocal',Array.from(neMap))
    } else{

      this.createNewMap(dimension , all , d , o2)
    }
  }

  createNewMap(dimension:string ,all:tile[] ,d:tile[][] , o2:number[][]) {
    let newData:dataSave = {cTile:new Map<string, {all:saveTileType[] , d:saveTileType[][] , o:number[][]}>([])}
    let newValue = d.map((value ) => {
      return value.map(value2=>{
        return this.convertToSaveTile(value2)
      })
    })

    let newT1 = all.map((value ) => {
      return this.convertToSaveTile(value)
    })
    newData.cTile.set(dimension , {all:newT1 , d:newValue , o:o2})
    this.dService.saveData('gridLocal',Array.from(newData.cTile))
  }

  getData(dimension:string) {
    let data = this.dService.getData('gridLocal')
    let newData:dataSave = {cTile:new Map<string, {all:saveTileType[] , d:saveTileType[][] , o:number[][]}>([])}

    if(data){
      newData.cTile = new Map(data)
      console.log(newData)
      let value = newData.cTile.get(dimension)
      if(value){

        let tvalue = value.d.map((value2) => {
          return value2.map((value3) => {
            return this.convertFromSaveTile(value3)
          })
        })

        let allvalue = value.all.map((value ) => {
          return this.convertFromSaveTile(value)
        })


        return {v:{all:allvalue , d:tvalue , o:value.o} , hasGrid:true , hasValue:true}
      }
      return {v:null , hasGrid:true , hasValue:false}
    }
    return {v:null , hasGrid:false , hasValue:false}
  }





  convertToSaveTile(t:tile){
    let newSaveTile:saveTileType = {
      builtIn: t.builtIn,
      data: t.data,
      display: t.display,
      index: t.index,
      name: t.name,
      position:t.position,
      type: t.type,
      zIndex: t.zIndex,
      id:t.id,
      component:t.compName
    }

    return newSaveTile;
  }
  convertFromSaveTile(t:saveTileType){
    let newTile:tile = {
      builtIn: t.builtIn,
      data: t.data,
      display: t.display,
      index: t.index,
      name: t.name,
      position:t.position,
      type: t.type,
      zIndex: t.zIndex,
      id:t.id,
      compName:t.component,
      component:this.getComponentFromName(t.component)
    }

    return newTile;
  }
  getComponentFromName(name:string){

    switch (name) {
      case "InfoComponent":
        return InfoComponent;
      case "BigInfoComponent":
        return BigInfoComponent;
      case "CalenderComponent":
        return CalenderComponent;
      case "ClockComponent":
        return ClockComponent;
      case "ImgWrapperComponent":
        return ImgWrapperComponent;
      case "ProfileTileComponent":
        return ProfileTileComponent;
      case "QuoteComponent":
        return QuoteComponent;
      case "SocialmediaComponent":
        return SocialmediaComponent;
      case "TetrisComponent":
        return TetrisComponent;
      case "TicTacToeComponent":
        return TicTacToeComponent;
      case "CertificateComponent":
        return CertificateComponent;
      default:
          return WeatherComponent;

    }
  }




}
