import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AccountService } from '../shared/account.service';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myrecord',
  templateUrl: './myrecord.page.html',
  styleUrls: ['./myrecord.page.scss'],
})
export class MyrecordPage implements OnInit {

  gameRecord: any;
  loading: boolean = false;
    constructor(private userService: UserService , 
                public accountService: AccountService,
                public menu: MenuController,
                public toastController: ToastController,
                private router: Router) { 
                  this.getRecord();
                
            
    }

 
    ngOnInit() {
      console.log('RECORD INIT FIRES');
    
  
    
  
    }
  
    gotoGame(){
      this.router.navigate(['game']);
    }
  
    async presentToast(msg) {
      const toast = await this.toastController.create({
        message: `${msg}`,
        position: 'middle',
        duration: 2000
      });
      toast.present();
    }
  
    getRecord() {
      this.loading = true;
      this.userService.getGameRecord().subscribe(
        response =>{
          this.gameRecord = response;
          this.loading = false;
          
          console.log(this.gameRecord);
  
        }
      );
    }
  
    deleteRecord(id){
      this.loading = true;
      this.userService.deleteGameRecord(id).subscribe( res => {
        this.getRecord();
        this.loading = false;
        let msg = 'record deleted successful!';
        this.presentToast(msg);
      },
      err => {
        this.loading = false;
        let msg = 'error deleting record!';
        this.presentToast(msg);
        this.getRecord();
      });
    }

}
