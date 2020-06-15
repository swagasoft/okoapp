import { GameServiceService } from './../shared/game-service.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loading: boolean;
  phoneRegex =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;


  constructor(public userService: UserService,
              public alertController: AlertController,
              public toastController: ToastController,
              public gameService: GameServiceService,
              private router: Router) {
                if(this.userService.networkDisconnet){
                  // this.presentFailNetwork();
              }
            }

            model = {
              number: '',
              password: '',
              username: '',
              conf_password:''
            };

  ngOnInit() {
  }

 
  async registerToast(message) {
    const toast = await this.toastController.create({
      header: 'Info ',
      message: `${message}`,
      position: 'middle',
      buttons: [
        {
          side: 'start',
          icon: 'flash',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }


  async presentSucess(message) {
    const toast = await this.toastController.create({
      header: 'Continue to login ',
      message: `${message}`,
      position: 'middle',
      buttons: [
        {
          side: 'start',
          icon: 'flash',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }, {
          text: 'Login',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    toast.present();
  }


  
  register(){
    this.loading = true; 
    this.userService.registerUser( this.model).subscribe( 
      response => {
        this.loading = false;
        let message = "Registraion successful!";
        this.presentSucess(message);        
        
      },
      error => {
        this.loading = false;
        console.log(error);
        let message = error.error;
        this.gameService.presentToast(message);
        
      }
    );
  }

}
