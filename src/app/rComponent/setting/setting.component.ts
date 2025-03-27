import {Component, inject, Type} from '@angular/core';
import {ArrangementService, tile, tileType} from '../../service/arrangment.service';
import {FormsModule} from '@angular/forms';
import {SocialmediaComponent} from '../../tiles/socialmedia/socialmedia.component';
import {InfoComponent} from '../../tiles/info/info.component';
import {PopWindowService} from '../../service/pop-window.service';
import {UnderConstructionComponent} from '../under-construction/under-construction.component';

enum sWindow {
  Wallpaper,
  Preferences,
  ComponentAdd,
}


@Component({
  selector: 'app-setting',
  imports: [
    FormsModule,
    UnderConstructionComponent
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
   selection = sWindow.Wallpaper;
   arrService = inject(ArrangementService)
  popService = inject(PopWindowService)

   changeSelection(s :sWindow): void {
     this.selection = s;
   }


  protected readonly sWindow = sWindow;
  protected readonly console = console;

  tiggerChange(idx:number , value:boolean) {
   let newComp = this.arrService.tiles_component()
    newComp[idx].display = !value;
   this.arrService.tiles_component.set(newComp)
   this.arrService.changedDisplay()
  }


  getTileType(n:String){
    switch(n) {
      case '2':
        return tileType.horizontal
      case '3':
        return tileType.big
      default:
        return tileType.xl
    }
  }


  createTileText(name: string, data: {
    value: string;
    color: string
  }, type: string, component: Type<any> = InfoComponent) {

    let newTile:tile = {
      component:component,
      position: {x:0 , y:0},
      index : [],
      type : this.getTileType(type),
      display:true,
      data:data,
      name:"",
      zIndex:1,
      id:name,
      builtIn:false
    }
    if(name != '' && data.value != ''){
      this.popService.message.set("Created")
      let tiles = this.arrService.tiles_component()
      tiles.push(newTile)
      this.arrService.tiles_component.set(tiles)
      this.arrService.changedDisplay()

    } else {
      this.popService.message.set("Empty Field")
    }


    this.popService.affer.set(true)

    setTimeout(() => {
      this.popService.affer.set(false)
    }, 2000)



  }


  protected readonly tileType = tileType;

  createTileImage(value: string, value2: string, value3: string, value4: string) {
    let newTile:tile = {
      component:SocialmediaComponent,
      position: {x:0 , y:0},
      index : [],
      type : tileType.small,
      zIndex: 1,
      display:true,
      data: {imgSource:value , route:value2},
      name:value4,
      id:value3,
      builtIn:false
    }

    if(value.trim() != '' && value2.trim() != ''&& value3.trim() != '' && value4.trim() != ''){
      this.popService.message.set("Created")
      let tiles = this.arrService.tiles_component()
      tiles.push(newTile)
      this.arrService.tiles_component.set(tiles)
      this.arrService.changedDisplay()

    } else {
      this.popService.message.set("Empty Field")
    }

    this.popService.affer.set(true)

    setTimeout(() => {
      this.popService.affer.set(false)
    }, 2000)




  }

  getPreferHeight(preferWindow: HTMLDivElement) {
    let height = preferWindow.clientHeight
    return 0.8 * height
  }


  deleteItem($index: number) {
    let tiles = this.arrService.tiles_component()
    tiles.splice($index, 1);
    this.arrService.tiles_component.set(tiles)
    this.popService.message.set("Deleted")
    this.arrService.changedDisplay()
    this.popService.affer.set(true)

    setTimeout(() => {
      this.popService.affer.set(false)
    }, 2000)
  }
}
