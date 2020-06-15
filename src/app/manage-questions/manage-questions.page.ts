import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { MenuController, AlertController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AdminnavigationComponent } from '../adminnavigation/adminnavigation.component';

@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.page.html',
  styleUrls: ['./manage-questions.page.scss'],
})
export class ManageQuestionsPage implements OnInit {
  questionsOutPut: any;
  catType: any;
  loading: boolean;
  showForm: boolean;
  showContent: boolean; 
  questionToEdit: any;
  liveQuestions: any;
  allLive_section : boolean = false;
  search_section : boolean = false;
  manage_section : boolean = true;

  constructor(private userService: UserService,
              public menu: MenuController,
              private popoverController: PopoverController,
              public alertController: AlertController,
              private router: Router) {
                this.getAllQuestions();
                this.getLiveQuestions();
               }

              questionModel = {
                id: '',
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
    filterOptions : [
    ],
    search:''
  } 
  ngOnInit() { 
    this.loading = false;
    this.showContent = true;
    this.showForm = false;
    this.questionsOutPut = 0;
  }

  selectChange( $event) {
    this.findByCategory($event);
        }

        getLiveQuestions(){
          this.userService.getLiveQuestionAmount().subscribe(
            res => {
              console.log(res);
              this.liveQuestions = res['count'];
            }
          )
        }

        getAllQuestions(){
          this.loading = true;
          this.userService.getAllQuestions().subscribe(
            res => {
              this.loading = false;
              console.log(res);
              this.questionsOutPut = res['quesions'];
            },
            err => {
              this.loading = false;
              console.log(err);
            }
          );
        }

        deleteQestion(id, category) {
          this.presentAlertConfirm(id, category);
          }

          async presentAlertConfirm(id, category) {
            const alert = await this.alertController.create({
              header: 'DELETE QUESTION ?',
              message: ' <strong class="text-danger"> Deleted question cannot be recovered</strong>!!!',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                    console.log('cancle delete');
                  }
                }, {
                  text: 'Yes',
                  cssClass: 'danger',
                  handler: () => {
                    this.loading = true;
                    this.userService.deleteQuestion(id).subscribe(
                      res => {
                        this.loading = false;
                        console.log('response .. success delete');
                        this.findByCategory(category);
                      },
                      err => {
                        this.loading = false;
                        this.findByCategory(category);
                      }
                    );
                  }
                }
              ]
            });
        
            await alert.present();
          }

          findByCategory(category){
            this.loading = true;
            console.log(category);
            // console.log(this.catType);
            this.userService.findByCategory(category).subscribe(
              res => {
                this.loading = false;
                this.questionsOutPut = res['questions'];
                console.log(this.questionsOutPut);
        
              },
              err => {
                this.loading = false;
                console.log(err);
              }
            );
        
          }
          addQuestion(){
            this.router.navigate(['/admin-upload']);
          }

          changeStatusTrue(id, category){
            console.log('I CLICK TRUE', category);
            this.userService.changeQuestionStatusToTrue(id).subscribe(
              res => { this.findByCategory(category); 
              } );
          }
        
          changeStatusFalse(id, category){
            console.log('I CLICK false');
            this.userService.changeQuestionStatusToFalse(id).subscribe(
              res => {
                this.findByCategory(category) });
          }

          editQuestion(id){
            this.showContent = false;
            this.showForm = true;
            this.loading = true;
            this.userService.getSingleQuestion(id).subscribe( 
              res => {
                this.loading = false;
                this.questionToEdit = res['doc'];
                this.questionModel.question = this.questionToEdit.question;
                this.questionModel.category = this.questionToEdit.category;
                this.questionModel.answer = this.questionToEdit.answer;
                this.questionModel.option1 = this.questionToEdit.option1;
                this.questionModel.option2 = this.questionToEdit.option2;
                this.questionModel.option3 = this.questionToEdit.option3;
                this.questionModel.option4 = this.questionToEdit.option4;
                this.questionModel.tip = this.questionToEdit.tip;
                this.questionModel.id = this.questionToEdit._id;
        
              },
              err => {
                this.loading = false;
                console.log(err);
              }
            );
          }

          
  updateQuestion(form: NgForm, id){
  
    console.log(this.questionModel.id);
    this.userService.upDateQuestion(this.questionModel).subscribe(
      response => {
        this.showForm = false;
        this.showContent = true; 
        console.log(response);
        this.findByCategory(this.questionModel.category);
      },
      error => {
        console.log(error); 
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

  searchQst(){
    console.log(this.model.search);
    let searchText = { text : this.model.search}
    this.loading = true;
    this.userService.searchQuestion(searchText).subscribe(
      res => {
        this.loading =false;
        console.log(res);
        this.questionsOutPut = res['questions'];
        console.log(this.questionsOutPut);
      },
      err => {
        console.log(err);
      }
    );
  }


}
