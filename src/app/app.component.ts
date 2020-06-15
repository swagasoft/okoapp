import { AccountComponent } from './components/account/account.component';

import { AccountService } from './shared/account.service';
import { UserService } from './shared/user.service';
import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AppRate } from '@ionic-native/app-rate/ngx';

import {NavController, Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild('bal', {static : false}) bal: ElementRef;
  showSlash = true;
  @ViewChild('nav', {static: false}) nav: NavController;
  
  authenticate = false;
  public appPages = [
   
    {
      title: 'EVENTS',
      url: '/events',
      icon: 'star-outline'
    },
     {
      title: 'PLAY GAME',
      url: '/gamesection',
      icon: 'logo-game-controller-b'
    },
    {
      title: 'ACCOUNT',
      url: '/account',
      icon: 'wallet'
    },
    {
      title: 'LEADERBOARD',
      url: '/leaderboard',
      icon: 'trophy'
    },
    {
      title: 'PLAY DEMO',
      url: '/playdemo',
      icon: 'logo-game-controller-b'
    },
    {
      title: 'MY RECORD',
      url: '/myrecord',
      icon: 'list-box'
    },
    {
      title: 'TRANSACTION',
      url: '/transaction',
      icon: 'card'
    },
    {
      title: 'HOW TO PLAY',
      url: '/howtoplay',
      icon: 'information-circle'
    },
  ];

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private alertCtrl: AlertController,
    private splashScreen: SplashScreen,
    public userService: UserService,
    public accountService: AccountService,
  ) {
    this.initializeApp();
  }


  // rateYourApp(){
  //   this.appRate.preferences.storeAppURL = {
  //     // ios: '<app_id>',
  //     // android: 'market://details?id=<ayawiesoft.swagasoft>',
  //     windows: 'ms-windows-store://review/?ProductId=<store_id>'
  //   }
  // }



  reloadBalance(){
    this.accountService.loadMyBalance();
    this.bal.nativeElement.classList.add('rubberBand');
    setTimeout(()=>{
      this.bal.nativeElement.classList.remove('rubberBand');
    },2000);

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
 
        
        // this.localNotifications.on('trigger').subscribe( res => {
        //   console.log('alert Trigger 2', res );
        //   let msg = res.data ? res.data.mydata : '';
        //   this.showAlert(res.title, res.text);
        // });
    
      
      this.statusBar.show();
      this.splashScreen.hide();
      timer(5000).subscribe(()=> this.showSlash = false);
    });

  }


  async showAlert(title, msg){
    const alert = await this.alertCtrl.create({
      header : title,
      message : msg
    });
    await alert.present();
  }

}