import { AccountService } from 'src/app/shared/account.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController, AlertController } from '@ionic/angular';
import { AdminnavigationComponent } from '../adminnavigation/adminnavigation.component';

@Component({
  selector: 'app-admin-leaderbord',
  templateUrl: './admin-leaderbord.page.html',
  styleUrls: ['./admin-leaderbord.page.scss'],
})
export class AdminLeaderbordPage implements OnInit {
  leaderBoard: any;
  loading: boolean = false;

  constructor(  private popoverController: PopoverController,
    public toastController: ToastController,
    public accountServive: AccountService, public alertController: AlertController) {
      this.getLeaderBoard();
     } 

  ngOnInit() {
  }

  async presentNavigation() {
    const popover = await this.popoverController.create({
      component: AdminnavigationComponent,
      translucent: true
    });
    return await popover.present(); 
  }

  getLeaderBoard(){
    this.loading = true;
    this.accountServive.getLeaderboard().subscribe((val)=> {
      this.leaderBoard = val['document'];
      this.loading = false;
      console.log(this.leaderBoard);
    })
  }

  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Confirm Settlement!',
      message: 'Settlement will delete this user from the leaderboard!!!',
    
      inputs: [
        {
          name: 'docID',
          value: id,
          type:'password',
          disabled: true
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: (val) => {
            this.loading = true;
            console.log('Confirm Okay', val.docID);
            this.accountServive.settleLeader(val.docID).subscribe(
              res => {
                this.loading = false;
                console.log(res);
                this.presentSuccessToast();
                this.getLeaderBoard();
              },
              error => {
                this.loading = false;
                console.log(error);
              }
            );
          }
        }
      ]
    });

    await alert.present();
  } 

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Record deleted sucessfully!!',
      position: 'middle',
      duration: 3000
    });
    toast.present(); 
  }

}
