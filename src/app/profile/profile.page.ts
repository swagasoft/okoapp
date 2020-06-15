import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { MenuController, ToastController } from '@ionic/angular';
import { AccountService } from '../shared/account.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  myProfile: any;
  userRecordNotAvalible: boolean = false;
  
  loading :boolean = true;
  emailRegex = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
    constructor(private userService: UserService,
                public menu: MenuController,
                public toastController: ToastController,
                public accountService: AccountService) {
                  this.getMyProfile();
                 }

                 
  model = {
    fullname :'',
    nationality: '',
    accountNumber: '', 
    accountName: '',
    bank : '',
    email : ''
  }

  setNationality = {
    selectedOption : [
    ]
  }


  
  ngOnInit() {
  }
  async presentFailNetwork() {
    const toast = await this.toastController.create({
      message: 'No internet connection!!!',
    });
    toast.present();
  }


  createProfile(form : NgForm){
    this.loading = true;
      console.log(this.model);
     
      this.userService.saveUserProfile(this.model).subscribe(res => {
        console.log(res);
        this.loading = false;
        this.getMyProfile();
      },
      err => {
        this.loading =false;
        console.log(err);
      });
  }

  selectChange( $event) {
    console.log($event);
    this.model.nationality = $event;
    // this.setNationality.selectedOption = $event;
      }

      getMyProfile() {
        this.userService.getUserProfile().subscribe(
          res => {
            this.loading = false;
            this.myProfile = res;
            console.log(this.myProfile);
            this.userRecordNotAvalible = false;
          },
          err => {
            this.loading = false;
            this.userRecordNotAvalible = true;
          }
        );
      }


}
