import { GameServiceService } from './../shared/game-service.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-payouts',
  templateUrl: './payouts.page.html',
  styleUrls: ['./payouts.page.scss'],
})
export class PayoutsPage implements OnInit {
  leaderBoard : any;
loading : boolean;
constructor(private accountServive: AccountService,
            private gameService: GameServiceService) {
  this.getWinners();
 }

ngOnInit() {
}

getWinners() {
  this.loading = true;
  this.accountServive.getWinners().subscribe(val => {
    this.leaderBoard = val["document"];
    console.log(this.leaderBoard);
    this.loading = false;
  });
}

payWinner(id, fileID){
  this.loading = true;
console.log(id, fileID);
const userDoc = {id, fileID}
this.accountServive.payWinner(userDoc).subscribe(
  res => {
    console.log(res);
    this.loading = false;
    let msg = res['message'];
    this.gameService.presentToast(msg);
    this.getWinners();
    
  
  },
  err => {
    this.loading = false;
    console.log(err);
    this.gameService.presentToast(err.error.message);
  }
)
}


}


