import { GameServiceService } from './../shared/game-service.service';
import { PopoverController, IonRefresher } from '@ionic/angular';
import { AccountService } from './../shared/account.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminnavigationComponent } from '../adminnavigation/adminnavigation.component';

@Component({
  selector: 'app-cashout-request',
  templateUrl: './cashout-request.page.html',
  styleUrls: ['./cashout-request.page.scss'],
})
export class CashoutRequestPage implements OnInit {
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher;
loading : boolean = false;
cashoutList: any;
  constructor(private accountService: AccountService,
              private gameService: GameServiceService,
              private popoverController: PopoverController) {
      this.cashoutRequest();
     
   }

  ngOnInit() { 

  }

  async doRefresh(refresher) {
    console.log('Begin async operation');
    await this.cashoutRequest();
    this.refresherRef.complete();
   
  }

  cashoutRequest(){
    console.log('fire cashout');
    this.loading = true;
    this.accountService.cashoutOutRequest().subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.cashoutList = res['document'];
      }
    );

  }

  payout(amount, user, id){
    let userObj = {amount: amount , user : user, fileID : id};
    this.accountService.payCashout(userObj).subscribe(
      res => {
        let msg = "payout success!";
        this.gameService.presentToast(msg);
        this.cashoutRequest();
      },
      err => {
       this.gameService.presentToast(err.error.message);
      }
    );


  }

  
  async presentNavigation() {
    const popover = await this.popoverController.create({
      component: AdminnavigationComponent,
      translucent: true
    });
    return await popover.present();
  }

} 
