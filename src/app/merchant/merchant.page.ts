import { GameServiceService } from './../shared/game-service.service';
import { AccountService } from 'src/app/shared/account.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.page.html',
  styleUrls: ['./merchant.page.scss'],
})
export class MerchantPage implements OnInit {
  @ViewChild('bal', {static : false}) bal: ElementRef;
  loading: boolean = false;
  constructor(public accountService: AccountService, public gameService: GameServiceService) { }

  model = {
    username: '',
    conf_username: '',
    amount : null
  }
  ngOnInit() {
  } 

  reloadBalance(){
    this.accountService.loadMyBalance();
    this.bal.nativeElement.classList.add('rubberBand');
    setTimeout(()=>{
      this.bal.nativeElement.classList.remove('rubberBand');
    },2000);

  }

  transferMoney(){
    if(this.model.username != this.model.conf_username){
      console.log('user not matched');
      let msg = 'incorrect input, cross-check input!';
      this.gameService.presentToast(msg);
    }else{
      console.log(this.model);
      this.loading  = true;
      this.accountService.merchantTransfer(this.model).subscribe(
        res => {
          console.log(res);
          let msg = res['msg'];
          this.gameService.presentToast(msg);
          this.accountService.loadMyBalance();
          this.loading = false;
        },
        err => {
          this.loading = false;
          let msg = err.error.msg;
          this.gameService.presentToast(msg);
          console.log(err);
        }
      );
    }
    console.log(this.model);
  }

 

}
