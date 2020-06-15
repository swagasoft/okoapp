import { EventService } from './../shared/event.service';
import { GameServiceService } from './../shared/game-service.service';
import { UserService } from './../shared/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
allEvent = [];
loading = true;
  constructor(private router: Router, private gameService: GameServiceService, 
    private eventService: EventService, private userService: UserService) { }

  ngOnInit() { 
    this.getAllevent();
  }


  getAllevent(){
      this.eventService.getAllEvent().subscribe(
        res => {
          console.log(res);
          this.allEvent = res['event'];
          this.loading = false;
        },
        err => {
          this.loading = false;
          this.userService.longToast(err.error.msg)
          

          console.log('error getting event', err);
        }
      );
  }

  insideEvent(id){
    this.router.navigate([`/inside-event`, id]);
    // this.router.navigateByUrl('/inside-event',id);
  }


 


}
