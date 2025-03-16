import {computed, Injectable, signal, WritableSignal} from '@angular/core';

import {
  Blocks,
  IBlock,
  JBlock,
  LBlock,
  OBlock,
  Rotation,
  SBlock,
  TBlock,
  TetrisType,
  ZBlock} from '../models/tetris-model';

export enum GameStatus {
  Running,
  Over,
  Pause ,
  Home,
}


@Injectable({
  providedIn: 'root'
})
export class TetrisServiceService {

  blocks:WritableSignal<TetrisType[]> = signal(Array(200).fill(TetrisType.invis));
  tOffset:WritableSignal<[number ,number]> = signal([4,-2])
  shadow_point:WritableSignal<number[]> = signal([])
  NextWindow:WritableSignal<TetrisType[]> = signal(Array(16).fill(TetrisType.invis))
  score:WritableSignal<number> = signal(0)

  TempBlocks = computed(() => {
    let arr = Array(200).fill(TetrisType.n)
    let piece_shadow = this.piece().colors as string
    this.shadow_point().forEach((item, index) => {
      if (arr[item] == TetrisType.n) {
        arr[item] = `${piece_shadow} opacity-25`
      }
    })
    this.piece().current_point.forEach((item) => {
      let index = this.getPoint([item[0]+this.tOffset()[0],item[1]+this.tOffset()[1]])
      arr[index]= this.piece().colors;
    })
    return arr;
  })


  getWidth(){
    let windowWidth = Math.floor(window.innerWidth*0.9);
    return Math.min(500, windowWidth).toString() + 'px';

  }
  tSize = computed(()=>{
    let windowWidth = Math.floor(window.innerWidth*0.9);
    return Math.min(500, windowWidth)/20 + "px";
  })
  speed = 700;
  piece: WritableSignal<Blocks> = signal(new TBlock())
  status:WritableSignal<GameStatus> = signal(GameStatus.Home);
  nextPiece : Blocks = this.getRandomBlock();

  constructor() {
    this.whenKeyAction = this.whenKeyAction.bind(this);
    this.whenKeyUpAction = this.whenKeyUpAction.bind(this);
    this.gameReset = this.gameReset.bind(this);
    this.assignNextPiece();
    //this.start()
  }

  // Event Action Function
  getNewHeight(){
    let newHeight = window.innerHeight

  }


  keyDownAction(key: String) {
    console.log('keyDownAction', key)
    switch (key) {
      case 'r':
        if(this.isMoveFeasible().get('Rotate')){
          let newPiece = Object.assign(Object.create(Object.getPrototypeOf(this.piece())), this.piece()) as Blocks
          let points = newPiece.rotate(Rotation.clock)
          newPiece.setRotation(points)
          this.updatePiece(newPiece)
          this.cal_shadow()
        }
        break;
      case 'd':
        if (this.isMoveFeasible().get('Right')){
          this.tOffset.update((value) => {
            return [value[0]+1 , value[1]]
          })
          this.cal_shadow()
        }
        break;
      case 'a':
        if (this.isMoveFeasible().get('Left')){
          this.tOffset.update((value) => {
            return [value[0]-1 , value[1]]
          })
          this.cal_shadow()
        }
        break;
      case ' ':
        this.speed = 100
        break;
      default:
        break;
    }

  }

  whenKeyUpAction(event: KeyboardEvent) {

    return this.keyUpAction(event.key.toLowerCase())
  }
  keyUpAction(key:string) {
    switch (key) {
      case " ":
        this.speed = 700;
        break
      default:
        break
    }
  }

  whenKeyAction(event: KeyboardEvent) {
    let key = event.key.toLowerCase();
    this.keyDownAction(key);
  }

  addEventListener() {
    window.addEventListener("resize",this.getNewHeight);
    window.addEventListener("keydown", this.whenKeyAction);
    window.addEventListener("keyup", this.whenKeyUpAction);

  }

  removeEventListener() {
    window.removeEventListener("resize",this.getNewHeight);
    window.removeEventListener("keydown", this.whenKeyAction);
    window.removeEventListener("keyup", this.whenKeyUpAction);
  }



  // conversion of 2D coordinate to one 1D number
  getPoint(point:[number , number]){
    return point[0] + point[1]*10
  }

  // Gets Random Tetris Block
  getRandomBlock():Blocks {
    let choices = [0 , 1 ,2,3,4,5,6];
    let index = Math.floor(Math.random() * choices.length);
    switch (index){
      case 0:
        return new SBlock()
      case 1:
        return new ZBlock()
      case 2:
        return new TBlock()
      case 3:
        return new IBlock()
      case 4:
        return new LBlock()
      case 5:
        return new OBlock()
      case 6:
        return new JBlock()
      default:
        return new SBlock()
    }
  }

  updatePiece(newPeace:Blocks):void{
    this.piece.update(()=> {
      return newPeace;
    })
  }

  isOccupied(point:number[][]){
    let occupied = false
    point.forEach((item) => {
      if (item[1] >= 0) {
        let _index = this.getPoint([item[0], item[1]])
        if (this.blocks()[_index] != TetrisType.invis) {
          occupied = true;
        }
      }
    })

    return occupied
  }

  isOutOfBounds(point:number[][]){
    let outOfBound = false
    point.forEach((item) => {
      if (item[0] <0 || item[0] > 9 || item[1] > 19){
        outOfBound = true
      }
    })
    return outOfBound
  }

  isMoveFeasible(){
    let feasibleMap:Map<string , boolean> = new Map([["Left" , false] ,["Right" , false],["Rotate" , false] , ["Down" , false]]);

    // left move simulation
    let leftMovePoint = this.piece().current_point.map((item)=>{return [item[0] + this.tOffset()[0]-1,item[1] + this.tOffset()[1]]});
    if (!this.isOccupied(leftMovePoint) && !this.isOutOfBounds(leftMovePoint)){
      feasibleMap.set('Left' ,true);
    }

    //right move simulation
    let rightMovePoint = this.piece().current_point.map((item)=>{return [item[0] + this.tOffset()[0]+1,item[1] + this.tOffset()[1]]});
    if (!this.isOccupied(rightMovePoint) && !this.isOutOfBounds(rightMovePoint)){
      feasibleMap.set('Right' ,true);
    }

    //down move simulation
    let downMovePoint = this.piece().current_point.map((item)=>{return [item[0] + this.tOffset()[0],item[1] + this.tOffset()[1]+1]});
    if (!this.isOccupied(downMovePoint) && !this.isOutOfBounds(downMovePoint)){
      feasibleMap.set('Down' ,true);
    }

    //rotate move simulation
    let rotateMovePoint = this.piece().rotate(Rotation.clock).map((item)=>{
      return [item[0] + this.tOffset()[0],item[1] + this.tOffset()[1]]
    })
    if (!this.isOccupied(rotateMovePoint) && !this.isOutOfBounds(rotateMovePoint)){
      feasibleMap.set('Rotate' ,true);
    }


    return feasibleMap

  }

  isGameOver(){
    let isOver = false
    this.piece().current_point.forEach((item) => {
      if (item[1] + this.tOffset()[1] < 0){
        isOver = true
      }
    })

    return isOver

  }

  cal_shadow(){
    let xOffset = this.tOffset()[0]
    let yOffset = this.tOffset()[1]


    let downMovePoint = this.piece().current_point.map((item)=>{return [item[0] + xOffset,item[1] + yOffset+1]});

    do {
      yOffset += 1;
      downMovePoint = this.piece().current_point.map((item)=>{return [item[0] + xOffset,item[1] + yOffset+1]})
    }while (!this.isOccupied(downMovePoint))

    let temp_shadow_point:number[] = Array(4).fill(0)
    this.piece().current_point.forEach((item, index)=>{
      temp_shadow_point[index] = this.getPoint([item[0]+xOffset, item[1] + yOffset])
    })

    this.shadow_point.update(() => temp_shadow_point)

  }





  setPiece(){
    this.blocks.update((previous) => {
      let newBlocks = previous
      this.piece().current_point.forEach((item) => {
        let index = this.getPoint([item[0]+this.tOffset()[0],item[1]+this.tOffset()[1]])
        newBlocks[index] = this.piece().colors
      })
      return newBlocks
    })
  }
  gameReset(){
    this.score.set(0);
    alert("Game Over")
    this.status.update(() => GameStatus.Home)
    this.blocks.update(() => {
      return Array(200).fill(TetrisType.invis)
    })
    this.tOffset.update(() => {
      return [4 , -2]
    })
    this.speed = 700;
  }

  reset(){
    this.setPiece()
    this.destruction()
    this.assignNextPiece()
    this.tOffset.update(()=>{
      return [4 , -2]
    })
    this.cal_shadow()

  }

  destruction(){
    let temp_blocks = this.blocks();
    let level = 0
    let blockRemove = 0;
    for(let i = 0; i < 20; i++){
      let isFilled = true
      for (let j = 0; j < 10; j++){
        if(temp_blocks[level + j] == TetrisType.invis){
          isFilled = false
          break
        }
      }

      if(isFilled){
        blockRemove++;
        temp_blocks.splice(level , 10);
        let newArray:TetrisType[] = new Array(10).fill(TetrisType.invis)
        temp_blocks = [...newArray , ...temp_blocks]
      }

      level += 10

    }
    if(blockRemove > 0){
      if(blockRemove > 1){
        let score = blockRemove*100 + (blockRemove-1)*20;
        let newScore = score + this.score()
        this.score.set(newScore);
      } else {
        let newScore = 100 + this.score()
        this.score.set(newScore);
      }
    }
    this.blocks.update(()=>{
      return temp_blocks;
    })
  }

  assignNextPiece(){
    this.updatePiece(this.nextPiece)
    this.nextPiece = this.getRandomBlock()


    this.NextWindow.update(() => {
      if (this.nextPiece.colors == TetrisType.i){

        let newArr:TetrisType[] = Array(16).fill(TetrisType.invis);
        this.nextPiece.current_point.forEach((item) => {
          let index = item[0] + item[1]*4
          newArr[index] = this.nextPiece.colors
        })

        return newArr
      } else {
        let newArr:TetrisType[] = Array(9).fill(TetrisType.invis);
        this.nextPiece.current_point.forEach((item) => {
          let index = item[0] + item[1]*3
          newArr[index] = this.nextPiece.colors
        })
        return newArr
      }
    })



  }


  start(){
    this.status.update(() => GameStatus.Running)
    this.updatePiece(this.getRandomBlock())
    this.cal_shadow()
    this.addEventListener()
    let tempCount = 0;
    let intervalID = setInterval(() => {
      tempCount += 200
      if (tempCount >= this.speed){
        if(this.isMoveFeasible().get('Down')){
          this.tOffset.update((value) => {
            return [value[0] , value[1]+1]
          })
        } else {
          if (this.isGameOver()){
            this.removeEventListener()
            this.gameReset()
            clearInterval(intervalID)
          } else {
            this.reset()
          }

        }
        tempCount = 0
      }

    },100)

    window.addEventListener(
      'popstate',
      (event) => {
        clearInterval(intervalID)
        this.gameReset()
      },
      { once: true }
    );
  }



}
