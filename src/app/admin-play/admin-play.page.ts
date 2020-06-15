import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminnavigationComponent } from '../adminnavigation/adminnavigation.component';
import { AlertController, PopoverController } from '@ionic/angular';
import { UserService } from '../shared/user.service';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-admin-play',
  templateUrl: './admin-play.page.html',
  styleUrls: ['./admin-play.page.scss'],
})
export class AdminPlayPage implements OnInit {
  @ViewChild('info', {static : false}) info: ElementRef; 
  @ViewChild('correct', {static : false}) correct: ElementRef;
  @ViewChild('wrong', {static : false}) wrong: ElementRef;
  gameQuestions: any[];
   
    lastQuestion : any;
    currentQuestion: any;
    startGame = false;
    progress: any;
    correcQuestion  = 0;
    wrongQuestion = 0;
     runningQuestion : any;
     timeMinute: any = 0;
    timeSeconds: any = 0;
    loadingGame = false;
    correctAns: any = 0;
    gameOver : boolean;
    wrongAns: any = 0;
    disableClick : boolean = false;
    low_balance = false;
    GameTimeMinute: any = 0;
  GameTimeSeconds: any = 0;

  constructor( public alertController: AlertController,
               private popoverController: PopoverController,
               private router : Router,
               private userService: UserService,
               public accountService: AccountService) { }

  ngOnInit() {
    this.getQuestionForGame();
    this.runningQuestion = 0;
    setTimeout(()=> {
      this.info.nativeElement.classList.remove('infinite');
    }, 8000);
  }

  async presentNavigation() {
    const popover = await this.popoverController.create({
      component: AdminnavigationComponent,
      translucent: true
    });
    return await popover.present();
  }

  getQuestionForGame() {
    this.loadingGame = true; 
    this.userService.getAllLiveQuestions().subscribe(
      res => {
        this.gameQuestions = res['questions'];
        this.lastQuestion =  this.gameQuestions.length - 1;
        this.loadingGame = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  gameisOver(){
    this.GameTimeMinute = this.timeMinute;
    this.GameTimeSeconds = this.timeSeconds;
    this.gameOver = true;
    this.startGame = false;
    
    const minutes = ( 4 - this.timeMinute );
    const seconds = (60 - this.timeSeconds );
    

    this.presentResult(minutes, seconds, this.correctAns);
   
    }

    checkAnswer(selection, correctAnswer) {
      this.disableClick = true;
      if (selection == correctAnswer){
        this.correct.nativeElement.classList.add('heartBeat');
        this.correctAns = this.correctAns + 1;
          } else {
        this.wrongAns = this.wrongAns + 1;
        this.wrong.nativeElement.classList.add('wobble');
        }
        // tslint:disable-next-line: align
        setTimeout(() => {
          this.nextQuestion();
        }, 1000);
  }

  startQuestion() {
    this.loadingGame = true;
    this.startGame = true;
    this.currentQuestion  = this.gameQuestions[this.runningQuestion];
    this.startTimer();
    this.loadingGame = false;
  }

  renderQuestion() {
    this.startGame = true;
    this.disableClick = false;
    this.currentQuestion  = this.gameQuestions[this.runningQuestion];
    }

    nextQuestion(){
      this.wrong.nativeElement.classList.remove('wobble');
      this.correct.nativeElement.classList.remove('heartBeat');
      if ( this.runningQuestion  < this.lastQuestion  ) {
        this.runningQuestion ++;
        this.renderQuestion();
      }else{
        this.startGame = false;
        this.gameOver = true;
        // no more question!
      }
    }

    previousQst(){
      this.runningQuestion --;
      this.renderQuestion();
    }

    renderProgress() {
      for (let qIndex = 0; qIndex <= this.lastQuestion; qIndex++ ) {
        this.progress = qIndex;
      } 
    }

    startTimer() {
      // COUNTDOWN IN SECONDS
     // EXAMPLE - 5 MINS = 5 X 60 = 300 SECS
     let counter = 15000;
     // Start if not past end date
     if (counter > 0) {
       const ticker = setInterval(() => {
         // Stop if passed end time
         counter--;
         if (counter == 0 || this.gameOver) {
           clearInterval(ticker);
           this.gameisOver();
           counter = 0;
          
         }
   
         let secs = counter;
         const mins  = Math.floor(secs / 60); // 1 min = 60 secs
         secs -= mins * 60;
         this.timeMinute = mins;
         this.timeSeconds = secs;
  
         if (this.gameOver){
           console.log('time is stoped');
          clearInterval(ticker);
         }else{
           console.warn('not yet time...');
         }
   
       }, 1000);
     }
   }

   async presentResult(min, secs, correct) {
    const alert = await this.alertController.create({
      header: ' GAME RESULT',
      message : `<h1>Score  ${correct}/ ${this.gameQuestions.length}</h1>  <br>
                <h6 class="text-success">Elapsed ${min} min , ${secs} secs`,
   
      buttons: [ {
          text: 'OK',
          cssClass : 'success',
          handler: (val) => {
           console.log('ok');
          }
        }
      ]
    });
  
    await alert.present();
  }

 async cancelGame(){
    const alert = await this.alertController.create({
      header: 'EXIT GAME',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            console.log('cancel amount input');
          }
        }, {
          text: 'Confirm',
          cssClass : 'success',
          handler: (val) => {
            this.gameisOver();
          }
        }
      ]
    });
  
    await alert.present();
  
  }

}
