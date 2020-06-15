import { Subscription, Observable } from 'rxjs';
import { GameServiceService } from './../../shared/game-service.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { AccountService } from 'src/app/shared/account.service';

import { RaveOptions } from 'angular-rave';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  reference: any;
  title: any;
  scheduled :  any;
  userEmail: any;
  appUsername: any;
  amountInput: any;
  paymentDoneSub : any;
  exactAmount: any;
  paymentOptions: any;
  showPaymentButtons : boolean = false;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string; 


  constructor(private router: Router, public userService: UserService,
              public accountService: AccountService,
              public gameSevice : GameServiceService,
              private platform: Platform,
              private localNotifications: LocalNotifications,
              public alertController: AlertController,
              public toastController: ToastController,
              public modalController: ModalController
             ) {  
                this.accountService.loadMyBalance();
                console.log('REF2', this.reference);

}

model = {
  amount: '', 
  cashout: '',
  username: ''
};

 RaveOptions = {
  PBFPubKey: 'FLWPUBK_TEST-0e44fc52fddf09104dc7aa889c085b11-X',
  customer_email:'swagasoft@gmail.com',
  custom_description: 'i-sabi credit',
  amount: 500000,
  currency:'NGN',
  customer_phone: '09026464646',
  txref:'238485458496',
  // txref: this.reference,
}

ngOnInit() {
  this.generateRef();
  console.log('REF', this.reference);
  console.log('trans ref', )
  this.appUsername = localStorage.getItem('appUser');
  this.model.username = this.appUsername;
}
ngOnDestroy() {
  // this.paymentDoneSub = '';
  this.amountInput = '';
  this.exactAmount = '';
  this.model = {
      amount: '',
      cashout: '',
      username: ''
    };
}

notiClick() {
  this.localNotifications.schedule({
    id: 1,
    title : 'i-sabi',
    icon : 'assets://icon/success_icon.png',
    attachments : ['/icon/success.png'],
    text : 'i-sabi  click Notifications',
    data : { pageData : AccountComponent},
    trigger : {in: 1, unit: ELocalNotificationTriggerUnit.SECOND},
    foreground : true
  });
  
}

scheduleNotification(){ 
  this.localNotifications.schedule({
    id: 2,
    title : 'shedule Attention',
    text : 'i-sabi Notifications',
    data : { pageData : AccountComponent},
    trigger : {in: 5, unit: ELocalNotificationTriggerUnit.SECOND},
    foreground : true
  });
}

recurrentNotification(){
  this.localNotifications.schedule({
    id: 3,
    title : 'trigger Attention',
    text : 'i-sabi trigger Notifications',
   
    trigger : {every : ELocalNotificationTriggerUnit.MINUTE},
    foreground : true
  });
}

getAllNotification(){
this.localNotifications.getAll().then((data) => {
  this.scheduled = data;
});
}

showNotiAlert(header, sub, msg){
  this.alertController.create({
    header: header,
    subHeader : sub,
    message : msg,
    buttons : ['ok']
  }).then((alert) =>  alert.present() );
}






paymentCancel(){
  this.showPaymentButtons = false;
  this.amountInput = '';
  this.exactAmount = '';
  this.generateRef();
  // this.amountInput = null;
}

generateRef() {
  this.reference = `${Math.ceil(Math.random() * 10e13)}`;
}

paymentDone(process: any) {
  this.showPaymentButtons = false;
  process.username = this.appUsername;
  process.amount = this.model.amount;

  this.paymentDoneSub = this.userService.postTransaction(process).subscribe(
    res => {
     this.amountInput = '';
     this.exactAmount = '';
     this.accountService.loadMyBalance();
      
     this.generateRef();
    },
    err => {
     this.amountInput = '';
     this.exactAmount = '';
     this.generateRef();
     this.amountInput = null;
     this.accountService.loadMyBalance();
    }
  );
  console.log( process);
 }


 profileSection(){
  this.router.navigate(['/profile']);
}

 payNow(){
  console.log('pay now is clicked..');
  this.exactAmount = this.amountInput;
  this.amountInput = this.model.amount;
  const paymentAmount = this.amountInput + '00';
  this.amountInput = paymentAmount;
  console.log(this.exactAmount);
  console.log(this.amountInput);
}

mobileTransfer(){
  console.log(this.model.amount.valueOf());
  this.showAlert();


}


async showAlert() {
  const alert = await this.alertController.create({
    header: 'MOBILE TRANSFER',
    message: `Add this id (${this.accountService.user_id})
    to your mobile transfer info. <br> after a successful transfer click OK.
             <p><h6 class=" font-weight-bold">Account Number: 3585745013</h6></p>
             <p><h6  class="font-weight-bold">Bank : FCMB </h6></p>
             <p><h6  class=" fiont-weight-bold">Account Name : Ayaweisoft </h6></p>
             <p> <h4 class=" fiont-weight-bold"> Amount : ₦ ${this.model.amount}</h4></p>`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary', 
        handler: () => {
         this.showPaymentButtons = false;
         this.generateRef();
        }
      }, {
        text: 'Okay',
        handler: () => {
         this.showPaymentButtons = false;
         const process = { username : this.appUsername , amount: this.model.amount, status : 'processing',
          trxref: this.reference, account_id: this.accountService.user_id, transaction : ' manual transfer'};

         process.username = this.appUsername;
         console.log('Confirm Okay', process);
         this.userService.postManualTrans(process).subscribe(
            res => {
              console.log(res);
              this.presentSucess();
            },
            err => {
              console.log(err); 
            }
          );
        }
      }
    ]
  });

  await alert.present();
}

async presentSucess() {
  this.showPaymentButtons = false;
  const toast = await this.toastController.create({
    message: 'Your account will be updated shortly.',
    position: 'middle',
    duration: 4000
  });
  toast.present(); 
}


async enterAmountInput() {
  const alert = await this.alertController.create({
    header: 'ENTER AMOUNT',
    inputs: [
      {
        name: 'amount',
        type: 'text',
        placeholder: 'Enter amount'
      }],
 
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'danger',
        handler: (blah) => {
          console.log('cancel amount input');
          this.generateRef();
        }
      }, {
        text: 'Confirm',
        cssClass : 'success',
        handler: (val) => {
          this.showPaymentButtons = true;
          this.exactAmount = val.amount;
          this.amountInput = this.model.amount;
          const paymentAmount = this.amountInput + '00';
          this.amountInput = paymentAmount;
          console.log(this.exactAmount);
          console.log(this.amountInput);
        }
      }
    ]
  });

  await alert.present();

}

async presentAmountInput() {
  const alert = await this.alertController.create({
    header: 'ENTER AMOUNT',
    inputs: [ {
        name: 'amount',
        type: 'text',
        placeholder: 'example 2000'
      }],
    buttons: [ {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: (value) => {
          console.log('Confirm Okay', value);
          this.model.amount = value.amount;
          this.payNow();
        }
      }
    ]
  });

  await alert.present();
}

// cashout
async enterCashoutAmount() {
  const alert = await this.alertController.create({
    header: 'ENTER CASHOUT',
    inputs: [
      {
        name: 'amount',
        type: 'text',
        placeholder: 'Enter amount'
      }],
 
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'danger',
        handler: (blah) => {
          console.log('cashout is canceled');
        
        }
      }, {
        text: 'Confirm',
        cssClass : 'success',
        handler: (val) => {
          this.model.cashout = val.amount;
          const userCashout = parseInt(this.model.cashout);

          if ( userCashout < 500){
           let  msg = "cashout must be greater that 500!";
            this.gameSevice.presentToast(msg);
          }else{

       
          this.accountService.cashout(this.model).subscribe(
          res => {

            console.log(res);
            this.accountService.loadMyBalance();
            this.cashoutSuccess();
          },
          err => {
            console.log(err);
            this.gameSevice.presentToast(err.error.message);
          }
        );
      }
        }
      }
    ]
  });

  await alert.present();
}



async cashoutSuccess() {
  const alert = await this.alertController.create({
    header: 'CASHOUT SUCCESSFUL',
    message : `your cashout of ₦${this.model.cashout} was successful`,
   
 
    buttons: [
     {
        text: 'Ok',
        cssClass : 'success',
        handler: () => {
          console.log('ok');
        }
      }
    ]
  });

  await alert.present();
}
} 
