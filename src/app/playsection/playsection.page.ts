import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IonSlides, MenuController, AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AccountService } from '../shared/account.service';
// import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'app-playsection',
  templateUrl: './playsection.page.html',
  styleUrls: ['./playsection.page.scss'], 
})
export class PlaysectionPage implements OnInit, OnDestroy {
  @ViewChild('info', {static : false}) info: ElementRef; 
  @ViewChild('correct', {static : false}) correct: ElementRef;
  @ViewChild('wrong', {static : false}) wrong: ElementRef;
  gameQuestions: any [];
   
    lastQuestion : any;
    currentQuestion: any;
    startGame = false;
    progress: any;
    correcQuestion  = 0;
    wrongQuestion = 0;
    timerTicker : any;
     runningQuestion : any;
     timeMinute: any = 0;
    timeSeconds: any = 0;
    loadingGame = false;
    correctAns: any = 0;
    gameOver : boolean;
    wrongAns: any = 0;
    disableClick : boolean = false;
    low_balance = false;

    private QuestionSub;
    private playCategory;
    private loadBalanceSub;
    private deductSub;

    GameTimeMinute: any = 0;
  GameTimeSeconds: any = 0;
    


  constructor(private userService: UserService,
              public accountService: AccountService,
              private alertController : AlertController,
              // private nativeAudio: NativeAudio,
              private router: Router) {
    this.getQuestionForGame();
    this.runningQuestion = 0;
    // setTimeout(()=> {
    //   this.info.nativeElement.classList.remove('infinite');
    // }, 12000);
  }

  model = {
    filterOptions : [
    ]
  } 


  ngOnInit() {

  }

  
  ngOnDestroy() {
    // this.gameQuestions.unsubscribe();
    this.QuestionSub = '';
    this.playCategory = '';
    this.loadBalanceSub = '';
    this.deductSub = '';
    this.timeSeconds = 0;
    this.timeMinute = 0;
    clearInterval(this.timerTicker);
    

    
  }

  getQuestionForGame() { 
    this.loadingGame = true;
    this.QuestionSub =  this.userService.getRandomQuestionsForGame().subscribe(
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

  selectChange( $event) {
    this.playByCategory($event);
        }

        playByCategory(category){
          this.loadingGame = true;
          this.playCategory =  this.userService.playByCategory(category).subscribe(
            res => {
              this.loadingGame = false;
              this.gameQuestions = res['questions'];
              this.lastQuestion =  this.gameQuestions.length - 1;
      
            }
          );
      
        }


  gameisOver(){ 
    this.GameTimeMinute = this.timeMinute;
    this.GameTimeSeconds = this.timeSeconds;
    this.gameOver = true;
    this.loadingGame = true;
    this.startGame = false;
    
    const minutes = (3 -  this.timeMinute );
    const seconds = (60 -  this.timeSeconds );
    let correct_qst = this.correctAns;
    let wrong_qst = this.wrongAns;
  
    this.presentResult(minutes, seconds, correct_qst);
    
    const record = {minutes , seconds, correct_qst, wrong_qst};
    this.userService.postQuestionRecord(record).subscribe(
        res => {
          this.loadingGame = false;
          console.log('record submitted..');
        }
      );
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
    this.loadBalanceSub =  this.accountService.loadBalanceForCalculation().subscribe(
      res => {
        const UserBalance = res['balance'];
        if (UserBalance < 200){
          this.low_balance = true;
          setTimeout(() => {
            this.low_balance = false;
          }, 7000);
          this.loadingGame = false;
        } else {

        this.deductSub =  this.accountService.deductGameAmountFromAccount().subscribe(
            () => {
              this.accountService.loadMyBalance();
              this.startGame = true;
              this.currentQuestion  = this.gameQuestions[this.runningQuestion];
              this.startTimer();
              this.loadingGame = false;

            },
            error => {console.log('ERROR', error); }
          );
        }
      },
      err => {
        console.error(err);
        this.loadingGame = false;
      }
    );

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
  

  renderProgress() {
    for (let qIndex = 0; qIndex <= this.lastQuestion; qIndex++ ) {
      this.progress = qIndex;
    } 
  }

  startTimer() {
    // COUNTDOWN IN SECONDS
   // EXAMPLE - 5 MINS = 5 X 60 = 300 SECS
   let counter = 240;
   // Start if not past end date
   if (counter > 0) {
     this.timerTicker = setInterval(() => {
       // Stop if passed end time
       counter--;
       if (counter == 0 || this.gameOver) {
         clearInterval(this.timerTicker);
         this.gameisOver();
         counter = 0;
        
       }
 
       let secs = counter;
       const mins  = Math.floor(secs / 60); // 1 min = 60 secs
       secs -= mins * 60;
       this.timeMinute = mins;
       this.timeSeconds = secs;

       if (this.gameOver){
         clearInterval(this.timerTicker);
       }else{
       }
 
     }, 1000);
   }
 }

 gameOverToleaderboard(){
   this.gameOver = undefined;
   this.correctAns = 0;
   this.wrongAns = 0;
   this.router.navigate(['/leaderboard']);
 }
 gameOverToRecords(){
   this.gameOver = undefined;
   this.correctAns = 0;
   this.wrongAns = 0;
   this.router.navigate(['/myrecord']);
 }

 
async presentResult(min, secs, correct) {
  const alert = await this.alertController.create({
    header: ' GAME RESULT',
    message : `<h1>Score  ${correct}/15</h1>  <br>
              <h6 class="text-success">Elapsed ${min} min , ${secs} secs`,
 
    buttons: [ {
        text: 'OK',
        cssClass : 'success',
        handler: (val) => {
         this.router.navigate(['/gamesection']);
        }
      }
    ]
  });

  await alert.present();
}


}
