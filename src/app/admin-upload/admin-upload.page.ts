import { ForgetpasswordComponent } from './../components/forgetpassword/forgetpassword.component';
import { AdminAccountComponent } from './../admin-account/admin-account.component';
import { AdminnavigationComponent } from './../adminnavigation/adminnavigation.component';
import { AccountComponent } from './../components/account/account.component';
import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, AlertController, PopoverController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-upload',
  templateUrl: './admin-upload.page.html',
  styleUrls: ['./admin-upload.page.scss'],
})
export class AdminUploadPage implements OnInit {
  public catType: any[];
  loading: boolean;



  constructor(private userService: UserService,
              public toastController: ToastController,
              public popoverController: PopoverController,
              public alertController: AlertController) { }

              
  questionModel = {
    question: '',
    option1: '',
    category: '',
    option2: '',
    option3: '',
    option4: '',
      tip  : '',
    answer: ''
  }

  model = {
    mlistOptions : [
    ]
  }

  ngOnInit() {
    this.loading = false;
  }

  async presentNavigation() {
    const popover = await this.popoverController.create({
      component: AdminnavigationComponent,
      translucent: true
    });
    return await popover.present();
  }


 
  submit(form: NgForm){
    this.loading = true;
    console.log(form.value);
    console.log(this.questionModel);
    this.questionModel.question = form.value.question;
    this.questionModel.answer = form.value.answer;
    this.questionModel.option1 = form.value.option1;
    this.questionModel.option2 = form.value.option2;
    this.questionModel.option3 = form.value.option3;
    this.questionModel.option4 = form.value.option4;
    this.questionModel.tip = form.value.tip;
    this.userService.postQuestion(this.questionModel).subscribe(
        response => {
          this.loading = false;
          console.log(response);
          this.resetForm();
          this.presentToast();
        },
        err => {
          this.loading = false;
          console.log(err);
          this.presentFail(err.error.message);
        }
      );

  }

  resetForm(){
    this.questionModel.category = '';
    this.questionModel.question = '';
    this.questionModel.answer = '';
    this.questionModel.option1 = '';
    this.questionModel.option2 =  '';
    this.questionModel.option3 = '';
    this.questionModel.option4 = '';
    this.questionModel.tip = '';
  }

  async presentFail(msg) {
    const alert = await this.alertController.create({
      header: 'Ooops!',
      message: ` <strong class="font-weight-bold text-danger text-center"> ${msg}</strong>`,
      buttons: [ {
          text: 'Retry',
          handler: () => {
            console.log('Confirm Okay');
          } 
        }
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Submitted successfully...',
      duration: 4000,
      position:"middle"
    });
    toast.present();
  }

  selectChange( $event) {
    this.questionModel.category = $event;
      }


}
