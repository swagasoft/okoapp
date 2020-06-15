import { AccountService } from 'src/app/shared/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
loading: boolean = true;
transaction: any;

  constructor(private accountService : AccountService) {
    this.getTransaction();
   }
 
  ngOnInit() {

  }


  getTransaction(){
    this.loading = true;
    this.accountService.myTransaction().subscribe(
      res => {
        this.loading = false;
        this.transaction = res['transaction'];
        console.log(res);

        console.log(this.transaction); 
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

}
