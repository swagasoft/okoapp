import { ToastController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';
declare var NetworkInterface: any;

@Injectable({
  providedIn: 'root'
})
export class GameServiceService  {
  gameNotLive: boolean = true;
  public gameLive: boolean = false;
  public timeDays: any;
  public timeHours: any;
  public timeMinute: any;
  public timeSeconds: any; 
  arrayLengthTips : any;
  gameTipArray: Observable<any>;
  public applicationDate: any;
  public youtubeLink: any;
  loading : boolean;

  
  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
  AuthHeader = {headers: new HttpHeaders().set('Authorization',
  `Bearer ${localStorage.getItem('token')}`)};
  
  constructor(private http: HttpClient,public alertController: AlertController,
     public toastController: ToastController) {
    this.getGameTip();


   }

  //  jan 10,2019 06:00:00
   // timer
   async gameTimer() {
     let fake_date = 'jan 10,2019 06:00:00';
     let appDATE = this.applicationDate;
     let deadline = new Date(appDATE).getTime();
    
     let x = setInterval(() => {
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
      clearInterval(x);
      this.timeDays = '0';
      this.timeHours = '0';
      this.timeMinute = '0';
      this.timeSeconds = '0';
   
          }else{
            console.log('GAME NOT LIVE....');
             this.gameLive = false;
            this.gameNotLive = true;
          }
          console.log('fake pass');
   
    }, 1000);
      }


  getGameTip(){
    this.http.get(environment.apiBaseUrl + '/game-fun-fact-tips').pipe(retry(3)).subscribe((tips) => {
      this.gameTipArray = tips['gamestips'];
      this.arrayLengthTips = tips['gamestips'].length;
    });
  }

 

  sendSms(sms){
   return this.http.post(environment.apiBaseUrl + '/send-sms', sms);
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      header: 'Info ',
      message: `${message}`,
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }


  setAdminDate(date) {
    return this.http.get(environment.apiBaseUrl + `/submit-admin-date${date}`);
  }

  setYoutubeDate(link) {
    return this.http.post(environment.apiBaseUrl + `/submit-youtube-link`, link);
  }
  getAdminDate() {
    this.loading = true;
    return this.http.get(environment.apiBaseUrl + '/get-admin-date').subscribe(
      res => {
        this.loading = false;
        this.applicationDate = res['doc']['appdate'];
      }
    );
  }

  getYoutubeLink(){
    return this.http.get(environment.apiBaseUrl + '/get-youtube-link');
  }

    createNewContestant(contestant){
      return this.http.post(environment.apiBaseUrl + '/create-new-contestant', contestant);
    }

  // this.youtubeLink = res['doc']['link'];
}




