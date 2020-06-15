import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  
  constructor(private userService : UserService , private router: Router){

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
  
    if(!this.userService.isLogedIn()){
      this.router.navigateByUrl('/login');
      this.userService.deleteToken();
      return false;
    }
    return true;
  }
}
