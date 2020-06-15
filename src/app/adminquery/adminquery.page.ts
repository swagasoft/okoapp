import { AccountService } from 'src/app/shared/account.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, PopoverController, AlertController } from '@ionic/angular';
import { AdminnavigationComponent } from '../adminnavigation/adminnavigation.component';

@Component({
  selector: 'app-adminquery',
  templateUrl: './adminquery.page.html',
  styleUrls: ['./adminquery.page.scss'],
})
export class AdminqueryPage implements OnInit {
loading: boolean = false; 
userDetails: any;
profile : any;

  constructor(private accountService: AccountService,
              public toastController: ToastController,
              private popoverController: PopoverController,
              public alertController: AlertController,
              public loadingController: LoadingController) { } 

  model = {
    query:''
  }
  ngOnInit() {
  }

  queryUser(){
    this.loading = true;
    console.log(this.model.query); 
    const obj = {user : this.model.query}
    this.accountService.queryUser(obj).subscribe(
      val => {
        this.loading = false;
        this.userDetails = val['userDetails'];
        this.profile = val['profile'];
        console.log(this.userDetails);
        console.log(this.profile);
      },
      err => {
        this.loading = false;
        this.presentToast();
        console.log(err);
      }
      
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "User not found! check spelling and caps",
      position : 'middle',
      duration: 3000
    });
    toast.present();
  }

  async presentNavigation() {
    const popover = await this.popoverController.create({
      component: AdminnavigationComponent,
      translucent: true
    });
    return await popover.present();
  }


}
