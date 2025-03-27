import {Component, signal, WritableSignal} from '@angular/core';
import {Router} from '@angular/router';

enum state {
  menu,
  winner,
  playing
}

enum Turn {
  x ='x',
  o = 'o',
  bot='b'
}
enum GameMode {
  single  ,
  multiple
}


@Component({
  selector: 'app-tick-tack-toe',
  imports: [],
  templateUrl: './tick-tack-toe.component.html',
  styleUrl: './tick-tack-toe.component.css'
})
export class TickTackToeComponent {
  tttgrid : WritableSignal<string[]> =  signal(new Array(9).fill(''))
  gameStatus:state = state.menu
  whoseTurn = Turn.x
  gameMode = GameMode.single
  winner : WritableSignal<boolean> = signal(false)
  displayMenu:WritableSignal<boolean> = signal(true);
  messange = ''
  playerTurn = Turn.x


  getBotMove(){
    let move = [0 , 1 , 2 , 3 , 4, 5 , 6 ,7 ,8]
    let possibleMove = move.filter(x => this.tttgrid()[x] == '')
    let randomMove = possibleMove[Math.floor(Math.random() * possibleMove.length)]
    setTimeout(() => {
      this.updateContent(randomMove , Turn.bot)
    } , 200)

  }

  winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  private route: any;

  constructor(route:Router) {
    this.route = route;
  }

  resetGrid(){
    this.tttgrid.set(new Array(9).fill(''))
  }

  onClickPlay(gameMode:GameMode){
    this.gameMode = gameMode
    this.whoseTurn = Turn.x
    this.playerTurn = Turn.x
    console.log(this.whoseTurn)
    this.gameStatus = state.playing
    this.displayMenu.set(false)
    this.winner.set(false)
  }

  onGameFinish(){
    this.gameStatus = state.menu
  }

  checkWin(){
    let won = false
    let winner:string = ''
    this.winConditions.forEach(condition => {
      const [a,b,c]  = condition
      if(this.tttgrid()[a] != '' && this.tttgrid()[a] == this.tttgrid()[b] && this.tttgrid()[a] == this.tttgrid()[c]){
        won = true;
        winner = this.tttgrid()[a]
      }
    })

    return {'won':won, 'winner':winner}

  }

  checkDraw(){
    let count= 0
    this.tttgrid().forEach(element => {
      if(element == ''){
        count++
      }

    })

    return count == 0
  }

  findWhoseTurn(){
    if(this.gameMode == GameMode.single){
      return this.whoseTurn == Turn.x ? Turn.bot: Turn.x;
    } else {
      this.playerTurn = this.whoseTurn == Turn.x ? Turn.o : Turn.x;
      return this.playerTurn
    }
  }



  updateContent(index:number , turn: Turn){
    console.log(turn)
    if(turn != this.whoseTurn){

    }else {
      if (this.tttgrid()[index] === '' && !this.winner()) {
        let newArray = this.tttgrid()
        newArray[index] = this.whoseTurn
        this.tttgrid.set(newArray)
        this.whoseTurn = this.findWhoseTurn()
        let data = this.checkWin()
        if (data.won) {
          setTimeout(() => {
            this.winner.set(true)
            this.gameStatus = state.winner
            this.setWinningMessage(data.winner)
            setTimeout(() => {

              this.gameStatus = state.menu
            } , 2000)
            this.resetGrid()
            this.displayMenu.set(true)
          }, 100)

        } else if (this.checkDraw()) {
          setTimeout(() => {
            this.winner.set(true)
            this.gameStatus = state.winner
            this.messange = 'Draw'
            setTimeout(() => {
              this.gameStatus = state.menu
            } , 2000)
            this.resetGrid()
            this.displayMenu.set(true)
          }, 100)
        }
      } else {

      }
      if (this.gameMode == GameMode.single && this.whoseTurn == Turn.bot) {
        this.getBotMove()
      }
    }
  }

  setWinningMessage(winner: string){
    if(this.gameMode == GameMode.single && winner == 'x'){
      this.messange = 'Winner'
    } else if(this.gameMode == GameMode.single && winner != 'x'){
      this.messange = 'Lost'
    } else if(this.gameMode == GameMode.multiple && winner == 'x'){
      this.messange = 'Player 1 Won'
    }else {
      this.messange = 'Player 2 Won'
    }
  }

  getInfo(turn:Turn){
    const botDialogue: string[] = [
      "Are you sure you're ready for this? I hope your X's and O's are up for the challenge!",
      "You'll be lucky if you manage to get one move in before I win!",
      "Haha, don’t worry, I’ll make it quick. No one can outsmart me in Tic-Tac-Toe!",
      "Are you trying to win, or just make me feel good by letting me win early?",
      "Let me know when you’re ready for the rematch… if you even manage to win once!",
      "You may want to take notes; you’re about to learn some Tic-Tac-Toe tricks.",
      "Nice move! It won’t matter. I’ve already planned my victory!",
      "Oops, did I win again? Guess you’ll just have to try harder next time!"
    ];
    switch (turn){
      case Turn.x:
        return "Player 1 Turn"
      case Turn.o:
        return "Player 2 Turn"
      default:
        return "Bot Turn"
    }
  }

  onExit(){
    this.route.navigate([''])
  }

  protected readonly Turn = Turn;
  protected readonly GameMode = GameMode;
  protected readonly state = state;
}
