import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage implements OnInit {
  player: string;
  rows = new Array(3);
  cols = new Array(3);
  winner: string;

  gameBoard = [[null,null,null],
    [null,null,null],
    [null,null,null]];

  constructor(private alertCtl: AlertController) {
  }

  ngOnInit() {
    this.newGame();
  }

  gameMove(row, col) {
    if(this.winner === '') {
      if(this.gameBoard[row][col] === null) {
        if (this.player === 'X') {
          this.gameBoard[row][col] = this.player;
          this.checkWinner(this.player);
          this.player = 'O';
        } else {
          this.gameBoard[row][col] = this.player;
          this.checkWinner(this.player);
          this.player = 'X';
        }
      }
    }
  }

  checkWinner(player) {
    const counter = [0,1,2];

    this.gameBoard.forEach(row => {
      if (row[0] === player && row[1] === player && row[2] === player) {
        this.winner = player;
      }
    });

    counter.forEach(count => {
      if(this.gameBoard[0][count] === player && this.gameBoard[1][count] === player && this.gameBoard[2][count] === player) {
        this.winner = player;
      }
    });

    if (this.gameBoard[0][0] === player && this.gameBoard[1][1] === player && this.gameBoard[2][2] === player) {
        this.winner = player;
      }
    if (this.gameBoard[0][2] === player && this.gameBoard[1][1] === player && this.gameBoard[2][0] === player) {
        this.winner = player;
      }

    if(this.winner != '') {
      const winnerAlert = this.alertCtl.create({
        title: 'We Have A Winner!',
        message: 'Congratulations Player ' + this.winner + ' you won!',
        buttons: [{
          text:'Start New Game',
          handler: () => {
            this.newGame();
          }
        }]
      })
      winnerAlert.present();
    }
  }

  newGame() {
    this.player = 'X';
    this.winner = '';
    this.gameBoard = [
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ];
  }

}
