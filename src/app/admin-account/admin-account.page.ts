import { GameServiceService } from './../shared/game-service.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { AdminnavigationComponent } from '../adminnavigation/adminnavigation.component';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.page.html',
  styleUrls: ['./admin-account.page.scss'],
})
export class AdminAccountPage implements OnInit {
 video_section = false;
 date_section = true;
 sms_section = false;


  loading  = false;

  constructor(public gameService: GameServiceService,
              private popoverController: PopoverController) { 

  }

 model= { 
   activate: '',
   date:'',
   sms:'',
   youtubeUrl:''
 };

  ngOnInit() {
  }

  dateSection(){
    this.date_section = true;
    this.video_section = false;
    this.sms_section = false;

  }

  smsSection(){
    this.date_section = false;
    this.video_section = false;
    this.sms_section = true;
  }

  videoSection(){
    this.date_section = false;
    this.video_section = true;
    this.sms_section = false;
  }

  eventSection(){
    this.date_section = false;
    this.video_section = false;
    this.sms_section = false;
  }




  

  selectedDate(event){
    console.log(event);
  }

  submitDate(form : NgForm){
    console.log(this.model.date);
  }

  submitSms(form : NgForm){
    console.log(this.model.sms);
    const sms = {sms : this.model.sms};
    this.gameService.sendSms(sms).subscribe(
      res =>{

       console.log(res);
       let message = res['message'];
       this.gameService.presentToast(message);
      }
      
    );
  }

  activateDate(){
    let adminDate = this.model.date;
    this.loading = true;
    
    this.gameService.setAdminDate(adminDate).subscribe(
      res => {
        this.loading = false;
        this.gameService.getAdminDate();
        window.location.reload();
      },
      err => {
        this.loading = false;
      }
    );

  }

  submityoutubeLink(link){
    this.loading = true;
    let body = {"link" : this.model.youtubeUrl};
    console.log(body);
    this.gameService.setYoutubeDate(body).subscribe(
        res => {
          this.loading = false;
          console.log(res);
        },
        err => {
          this.loading = false;
          console.log(err);
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
 

  createContestant(form: NgForm){
    console.log(form);
  }

}
