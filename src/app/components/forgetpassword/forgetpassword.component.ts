import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { AccountService } from './../../shared/account.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})


export class ForgetpasswordComponent implements OnInit {

  showPasswordEdit: boolean = false;
  showNumberForm: boolean  = true;
  showOTPInput: boolean = false;
  confirmOTP : boolean = false;
  otpFromServer: any;
  userOtpInput: any = 0;
  phoneFromServer : any;
  loading: boolean = false;
  allowReset : boolean = false;

  // noAuthHeader = headers: new HttpHeaders({NoAuth: 'True'});


   header = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin','*');
 
  constructor(private accountService: AccountService,
              private http: HttpClient,
              public alertController: AlertController,
              private router : Router,
              public toastController: ToastController,
              private userService: UserService) { 
  }

 

  model = {
    number:'',
    userOtpConfirm : '',
    newPassword : '',
    confirmPassword : ''
  }

  ngOnInit() {

  }


  submitNumber(form: NgForm) {
    this.loading = true;
    this.userService.confirmNumber(this.model.number).subscribe(
      res => {
        this.loading = false;
        this.showPasswordInput();
        this.otpFromServer = res['otp'];
        this.phoneFromServer = res['phone'];


        console.log(this.otpFromServer);
        console.log(this.phoneFromServer);
        this.showNumberForm = false;
        this.showOTPInput = true;
      },
      err => {
        this.loading = false; 
        this.noUserFound();
        console.log(err.error);
      }
    );
  }

  // alert input for reset password
  async showPasswordInput() {
    const alert = await this.alertController.create({
      header: 'ENTER OTP SENT TO YOU',
      inputs: [
        {
          name: 'otp',
          type: 'number',
          placeholder: 'enter otp'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('password reset cancel');
         
          } 
        }, {
          text: 'Confirm',
          handler: (data) => {
            this.allowResetpasswordIfTrue(data.otp);
            console.log(' clecked ok.....', data.otp);

                 }
        }
      ]
    });

    await alert.present();
  }


  allowResetpasswordIfTrue(userOtp){
      if(userOtp === this.otpFromServer){
        console.log('UNLUCK PASSWORD API');
        this.allowReset = true;
      }else{
        let msg = 'The supplied OTP is invalid';
        this.presentToast(msg);
        this.showNumberForm = true;
        console.log('otp is not correct..');
      }
  } 




  async noUserFound() {
    const toast = await this.toastController.create({
      message: `User with 0${this.model.number} not found`,
      position : 'middle',
      duration: 3000
    });
    toast.present();
  }

  submitNewPassword(password) {
    console.log(this.model.newPassword);
    console.log(this.model.confirmPassword);
    if(this.model.newPassword === this.model.confirmPassword){
     console.log('user can submit password');

     this.userService.resetPassword(this.model).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/login']);
        let msg = 'Successful!!! you can login with your new password'
        this.presentToast(msg);
      },
      error => {
        console.log(error);
      }
    );

   }else{
    console.log('password not match');
    let msg = 'password not match';
    this.presentToast(msg);

   }
  }


  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position : 'middle',
      duration: 2000
    });
    toast.present();
  }


}
