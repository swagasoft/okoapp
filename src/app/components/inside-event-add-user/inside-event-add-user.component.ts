import { UserService } from './../../shared/user.service';
import { EventService } from './../../shared/event.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-inside-event-add-user',
  templateUrl: './inside-event-add-user.component.html',
  styleUrls: ['./inside-event-add-user.component.scss'],
})
export class InsideEventAddUserComponent implements OnInit {

  constructor(public modalController: ModalController, public navParams: NavParams,
        private eventService: EventService, public userService: UserService ) { 
                  console.log('id', navParams.get('event_id'));
                  this.contesttModel.event_id =  navParams.get('event_id');
  }

  contesttModel = {
        event_id: '', fullname: '', nickname: '', image_url: ''
  }
 
  ngOnInit() {
  
  }

  closeModal(){
    this.modalController.dismiss();
  }



  submitUser(){
    console.log(this.contesttModel);
    this.eventService.createContestTant(this.contesttModel).subscribe(
      res => {
        this.closeModal();
        this.userService.shortToast(res['msg']);
      },
      err => {
          this.userService.longToast(err.error.msg);
      }
    )
  }

}
