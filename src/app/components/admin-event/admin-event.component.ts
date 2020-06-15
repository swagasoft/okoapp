import { Router } from '@angular/router';
import { UserService } from './../../shared/user.service';
import { EventService } from './../../shared/event.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.scss'],
})
export class AdminEventComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
loading = false;

  constructor( private eventService: EventService, private userService: UserService,
               private router: Router) {}

  eventModel = {
    eventName: '', type: '', image_url: '', companyName: '', address: '', contactNumber: '', aboutEvent: '',bankname:'',
    costPerVote: '', numberOfSlot: '', sharingRatio_isabi: '',  sharingRatio_company: '', accountNumber: '', accountName: ''
  }
  ngOnInit() {


  }


  submitEvent(){
    console.log(this.eventModel);
    this.eventService.submitEvent(this.eventModel).subscribe(
      res => {
         console.log('event submitted successful!');
         this.userService.shortToast(res['msg']);
         this.resetForm();
         setTimeout(()=>{
           this.router.navigateByUrl('/events')
         },2000)
      },
      err => {
        console.log('error submitting event.');
        this.userService.shortToast(err.error.msg);
      }
    );
  }

  eventType(event){
    console.log(event);
   
  }

  resetForm(){
    this.eventModel = {
      eventName: '', type: '', image_url: '', companyName: '', address: '', contactNumber: '', aboutEvent: '',bankname:'',
      costPerVote: '', numberOfSlot: '', sharingRatio_isabi: '',  sharingRatio_company: '', accountNumber: '', accountName: ''
    }
  }

  
 
}
