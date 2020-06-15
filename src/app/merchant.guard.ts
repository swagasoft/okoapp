import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class MerchantGuard implements  CanActivate {
  userRole: any;
  constructor(private userService : UserService,
    private router: Router){
}

canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
  this.userRole = this.userService.getUserRole();
  console.log('INSIDE ADMIN CANACTIVATE',this.userRole );
  const merchant = 'MERCHANT';
  if( this.userRole !== merchant){
    this.router.navigateByUrl('/gamesection');
    this.userService.deleteToken();
    return false;

  }
  return true;
}
}
