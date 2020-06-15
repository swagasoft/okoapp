import { AccountService } from "src/app/shared/account.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MenuController, ToastController, IonRefresher } from "@ionic/angular";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.page.html",
  styleUrls: ["./leaderboard.page.scss"]
})
export class LeaderboardPage implements OnInit {
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher;
  leaderBoard: any = [];
  loading: boolean;

  constructor(
    public menu: MenuController,
    private userService: UserService,
    private router: Router,
    public toastController: ToastController,
    public accountServive: AccountService
  ) {
    this.getLeaderBoard();
  }

  ngOnInit() {}

  async presentFailNetwork() {
    const toast = await this.toastController.create({
      message: "No internet connection!!!"
    });
    toast.present();
  }
  gotoGame() {
    this.router.navigate(["gamesection"]);
  }

  async doRefresh(refresher) {
    console.log('Begin async operation');
    await this.getLeaderBoard();
    this.refresherRef.complete();
   
  }

  getLeaderBoard() {
    this.loading = true;
    this.accountServive.getLeaderboard().subscribe(val => {
      this.leaderBoard = val["document"];
      console.log('getting leaderboard')
      this.loading = false;
    });
  }
}
