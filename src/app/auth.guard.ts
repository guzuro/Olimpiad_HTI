import {    Injectable  } from '@angular/core';
import {    Router,    CanActivate,    ActivatedRouteSnapshot,    RouterStateSnapshot,  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

  @Injectable()
  export class AuthGuard implements CanActivate {

    constructor(
      private authService: AuthService,
      public router: Router
    ) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable < boolean > | Promise < boolean > | boolean {

      if (this.authService.isAuth && this.authService.userRole == "Клиент") {
        return true
      }
      if (this.authService.isAuth && this.authService.userRole !== "Клиент") {
        console.log(this.authService.userRole);
        
        this.router.navigate(['/admin'])
        return false
      }
      this.router.navigate(['login'], {
        queryParams: {
          loginFirst: true
        }
      })
      return false;
    }

  }


  @Injectable()
  export class LoginRedirect implements CanActivate {

    constructor(
      private authService: AuthService,
      public router: Router
    ) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable < boolean > | Promise < boolean > | boolean {
      if (this.authService.isAuth == true && state.url == '/login') {
        this.router.navigate(['user-dashboard'])
        return false
      }
      return true
    }

  }
