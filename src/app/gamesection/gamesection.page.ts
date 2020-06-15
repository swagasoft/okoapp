
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { GameServiceService } from '../shared/game-service.service';
import anime from 'animejs';
import { UserService } from '../shared/user.service';
import { AlertController, ToastController, MenuController, IonSlides, Platform } from '@ionic/angular';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
import { Observable, Subscription  } from 'rxjs';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AccountComponent } from '../components/account/account.component';

@Component({
  selector: 'app-gamesection',
  templateUrl: './gamesection.page.html',
  styleUrls: ['./gamesection.page.scss'],
})
export class GamesectionPage implements OnInit , OnDestroy {
  @ViewChild('mySlider', {static : false}) mySlider: IonSlides;
  @ViewChild('box', {static : false}) box: ElementRef;
  @ViewChild('items', {static : false}) items: ElementRef;
  @ViewChild('video_link', {static : false}) video_link: ElementRef;
  documents: Observable<string[]>;
  private _docSub: Subscription;

  appUser: any;
  low_balance :boolean = false;
  safeVideo: any;
  loading = false;
  gameTime : any;
  versionCode = 4.1;
  serverVersion: any;
  public applicationDate: any;
  gameNotLive: boolean = true;
  public gameLive: boolean = false;
  public timeDays: any;
  public timeHours: any;
  public timeMinute: any;
  public timeSeconds: any; 

  

  constructor(public gameService: GameServiceService,
              public userService: UserService,
              private http: HttpClient,
              public alertController: AlertController,
              public toastController: ToastController,
              public accountService: AccountService,
              private platform: Platform,
              private localNotifications: LocalNotifications,
              public menu: MenuController,
              protected sanitizer: DomSanitizer,
              private router: Router) {
                this.getAdminDate();
                this.autoSlide();
                if(this.gameNotLive) {
            gameService.getGameTip(); 
            

          } else {
            
            console.log('GAME LIVE ... GAME COMPONENT');
            
          }

     }

  ngOnInit() {
    this.loadBalance(); 
    this.appUser = localStorage.getItem('appUser');
    this.getYoutubeLink();
    // this.doMagic();
  }

  ngOnDestroy() {
    console.log('on desotry');
    clearInterval(this.gameTime);
    
  }


  // App Date
 async getAdminDate() {
    this.loading = true;
    this.http.get(environment.apiBaseUrl + '/get-admin-date').subscribe(res => {
     this.loading = false;
     this.applicationDate = res['doc']['appdate'];
     this.serverVersion = res['version'];
     console.log(this.serverVersion);
     this.gameTimer();

     setTimeout(()=> {
       if(this.serverVersion > this.versionCode){
          this.presentUpdate();
       }
     },3000);
   });
  }
 
  async gameTimer() {
    let fake_date = 'jan 10,2019 06:00:00';
    let appDATE = this.applicationDate;
    let deadline = new Date(fake_date).getTime();
   
    this.gameTime = setInterval(() => {
   let now = new Date().getTime();
   let t = deadline - now;
   this.timeDays = Math.floor(t / (1000 * 60 * 60 * 24)).toString();
   this.timeHours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
   this.timeMinute = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)).toString();
   this.timeSeconds = Math.floor((t % (1000 * 60)) / 1000).toString();
   
   if (t < 0) {
     console.log('GAME IS LIVE....');
     this.gameLive = true;
     this.gameNotLive = false;
     clearInterval(this.gameTime);
     this.timeDays = '0';
     this.timeHours = '0';
     this.timeMinute = '0';
     this.timeSeconds = '0';
  
         } else {
           console.log('GAME NOT LIVE....');
           this.gameLive = false;
           this.gameNotLive = true;
         }
   console.log('fake pass');
  
   }, 1000);
     }

  
notificationTest() {
  this.localNotifications.schedule({
    id: 5,
    title : 'I-SABI ',
    icon : 'success_icon.png',
    smallIcon : 'success_icon.png',
    text : `I-sabi clue tips gives you clue for saturday game session, dont miss out! `,
    data : { pageData : GamesectionPage},
    actions : [ { id: 'yes', title: 'View clue tips' },],
    
    trigger : {in:3, unit: ELocalNotificationTriggerUnit.SECOND},
    foreground : true
  });
  
}

async autoSlide() {
  setTimeout(()=> {
if (!this.gameLive) {
  setInterval(() => {
    console.log('NOW SLIDING... GAME NOT LIVE..');
    this.mySlider.slideNext();
  }, 16000);
} else {
  console.log('i cannot slide');
}

}, 9000);
}

liveGameNotification() {
  this.localNotifications.schedule({
    id: 6,
    title : 'I-SABI GAME',
    icon : 'success_icon.png',
    smallIcon : 'success_icon.png',
    text : 'Game is live! 15 correct questions can give you up to 50k',
    data : { pageData : GamesectionPage},
    trigger : {},
    foreground : true
  });
}


  async presentNotice() {
    const alert = await this.alertController.create({
      header: 'Notice!',
      cssClass : 'success',
      message : `<h6> Game will be live this saturday 6AM to 6PM...!</h6>  <br>
               Click continue to study clue tips against saturday's game sessions.`,
   
      buttons: [ {
          text: 'continue',
          cssClass : 'success',
          handler: (val) => {
           console.log('close notice');
          }
        }
      ]
    });
  
    await alert.present();
  }

  async presentUpdate() {
    const alert = await this.alertController.create({
      header: ' Update!',
      cssClass : 'success',
      message : `<h6>a new update is available.</h6>  <br>`,
   
      buttons: [ {
          text: 'update now',
          cssClass : 'success',
          handler: (val) => {
          window.location.href ='https://play.google.com/store/apps/details?id=ayawiesoft.swagasoft';
          }
        }
      ]
    });
  
    await alert.present();
  }


  

  doMagic() { anime({ targets: '#fiftyk', translateX: {
        value: 250,
        duration: 800
      },
      rotate: { value: 360, duration: 1800, easing: 'easeInOutSine'
      }, scale: { value: 2, duration: 1600, delay: 800,
        easing: 'easeInOutQuart' 
      },
      delay: 250 
    });
  }

  clickSlidetoNext() {
    console.log('slide to next')
    this.mySlider.slideNext();
  }

  clickSlidePrevious() {
    console.log('slide to previous');
    this.mySlider.slidePrev();
  }

  // this.youtubeLink = res['doc']['link'];
  async getYoutubeLink() {
   await this.gameService.getYoutubeLink().subscribe(
      res => {
        let youtubeVideo =  res['doc']['link'];
        console.log( 'link',youtubeVideo);
        this.safeVideo = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeVideo);
      }
    );
  }


  goToRecoreds() {
    this.router.navigate(['gamerecord']);
  
  }

  loadBalance() {
    this.accountService.loadMyBalance();
  } 

  makePayment() {
    this.router.navigate(['/account']);
  }

}
