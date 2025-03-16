export enum Rotation {
  anti_clock,
  clock
}

export enum TetrisType {
  s="bg-sky-400",
  z = "bg-cyan-400",
  l = "bg-lime-400",
  j = "bg-pink-400",
  o= "bg-rose-400",
  i = "bg-purple-400",
  n = "bg-gray-200",
  t = "bg-teal-400",
  shadow = "bg-gray-300",
  invis = "bg-transparent"
}


export class Blocks {
  current_point: number[][] = [];
  points: number[][][] = [];
  colors:TetrisType = TetrisType.n;
  rotate(rotation:Rotation): number[][] {
    const currentIndex = this.points.indexOf(this.current_point);
    switch (rotation) {
      case Rotation.clock:
        let nextIndex1 = (currentIndex + 1) % this.points.length;
        return this.points[nextIndex1];
      case Rotation.anti_clock:
        let nextIndex2: number = currentIndex - 1 < 0 ? this.points.length - 1 : currentIndex - 1;
        return this.points[nextIndex2];
    }

  }

  setRotation(points:number[][]){
    this.current_point = points;
  }


}

export class LBlock extends Blocks {

  constructor() {
    super();
    this.points  = [
      [[0, 1], [1, 1], [2, 1], [2, 0]],
      [[1, 0], [1, 1], [1, 2], [2, 2]],
      [[0, 2], [0, 1], [1, 1], [2, 1]],
      [[0, 0], [1, 0], [1, 1], [1, 2]]
    ];
    this.current_point = this.points[0]
    this.colors = TetrisType.l
  }

}



export class OBlock extends Blocks {

  constructor() {
    super();
    this.points  = [
      [[1, 0], [2, 0], [1, 1], [2, 1]],
      [[1, 0], [2, 0], [1, 1], [2, 1]],
      [[1, 0], [2, 0], [1, 1], [2, 1]],
      [[1, 0], [2, 0], [1, 1], [2, 1]]
    ];
    this.current_point = this.points[Math.floor(Math.random() * this.points.length)];
    this.colors = TetrisType.o;
  }

}

export class IBlock extends Blocks {

  constructor() {
    super();
    this.points  = [
      [[0, 1], [1, 1], [2, 1], [3, 1]],
      [[2, 0], [2, 1], [2, 2], [2, 3]],
      [[0, 2], [1, 2], [2, 2], [3, 2]],
      [[1, 0], [1, 1], [1, 2], [1, 3]]
    ];
    this.current_point = this.points[Math.floor(Math.random() * this.points.length)]
    this.colors = TetrisType.i
  }

}


export class TBlock extends Blocks {

  constructor() {
    super();
    this.points = [
      [[1, 0], [0, 1], [1, 1], [2, 1]],
      [[1, 0], [1, 1], [1, 2], [2, 1]],
      [[0, 1], [1, 1], [2, 1], [1, 2]],
      [[0, 1], [1, 0], [1, 1], [1, 2]]
    ];
    this.current_point = this.points[Math.floor(Math.random() * this.points.length)]
    this.colors = TetrisType.t
  }
}

export class JBlock extends Blocks {

  constructor() {
    super();
    this.points  = [
      [[0,0], [0, 1], [1,1], [2, 1]],
      [[1, 0], [1, 1], [1, 2], [2, 0]],
      [[0, 1], [1, 1], [2, 1], [2, 2]],
      [[0, 2], [1, 2], [1, 1], [1, 0]]
    ];
    this.current_point = this.points[Math.floor(Math.random() * this.points.length)]
    this.colors = TetrisType.j
  }

}

export class SBlock extends Blocks {

  constructor() {
    super();
    this.points  = [
      [[0,1], [1, 1], [1,0], [2, 0]],
      [[1, 0], [1, 1], [2, 1], [2, 2]],
      [[0, 2], [1, 2], [1, 1], [2, 1]],
      [[0, 0], [0, 1], [1, 1], [1, 2]]
    ];
    this.current_point = this.points[Math.floor(Math.random() * this.points.length)]
    this.colors = TetrisType.s
  }

}

export class ZBlock extends Blocks {

  constructor() {
    super();
    this.points  = [
      [[0,0], [1, 0], [1,1], [2, 1]],
      [[1, 2], [1, 1], [2, 1], [2, 0]],
      [[0, 1], [1, 1], [1, 2], [2, 2]],
      [[0, 2], [0, 1], [1, 1], [1, 0]]
    ];
    this.current_point = this.points[Math.floor(Math.random() * this.points.length)]
    this.colors = TetrisType.z
  }

}


export class TetrisModel {
}
