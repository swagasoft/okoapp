import { PopoverController, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { AdminnavigationComponent } from '../adminnavigation/adminnavigation.component';

@Component({
  selector: 'app-admintransfer',
  templateUrl: './admintransfer.page.html',
  styleUrls: ['./admintransfer.page.scss'],
})
export class AdmintransferPage implements OnInit {
manualTransfer : Array<any>;
loading: boolean = true;

  constructor(private accountService: AccountService,
              public toastController: ToastController,
              public alertController: AlertController,
              private popoverController: PopoverController) { 
    this.getManualList();
  }

  ngOnInit() { 
  }

  getManualList(){
    this.accountService.getManualTransactions().subscribe(
      res => {
        this.loading = false;
        this.manualTransfer = res['trans'];
        console.log(this.manualTransfer);
      }
    );
  }

  confirmUser(id){ 
    this.loading = true;
    console.log(id);
    this.accountService.confirmTransaction(id).subscribe(
      res => {
        this.loading = false;
        this.getManualList();
      },err => {
        this.loading = false;
        console.log(err);
        this.getManualList();
      }
    )
    
  }

  async presentNavigation() {
    const popover = await this.popoverController.create({
      component: AdminnavigationComponent,
      translucent: true
    });
    return await popover.present();
  }

  
async declineAlert(id, amount, username){
  const alert = await this.alertController.create({
    header: 'Decline Transaction!',
    message: `Message <strong> ${amount}</strong>!!! <br>
              Username : ${username}`,
    buttons: [
      {
        text: 'CANCEL',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Cancel');
        }
      }, {
        text: 'DECLINE',
        handler: () => {
          console.log('Confirm Okay');
          this.accountService.declineTransaction(id).subscribe(
            res => {
              let message = 'Transaction declined'
              console.log(res);  this.getManualList(); this.presentToast(message) },
            err => { this.loading = false; this.getManualList(); }
          );
        }
      }
    ]
  });

  await alert.present();
}

async presentToast(msg) {
  const toast = await this.toastController.create({
    message: msg,
    position: 'middle',
    duration: 3000
  });
  toast.present(); 
}
}

