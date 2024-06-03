import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

constructor( private authService: AuthService, private router: Router) {}
canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  throw new Error('Method not implemented.');
}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  return this.authService.isAdmin()
  .then((authenticated: boolean) => {
    console.log(authenticated);
    console.log('authenticated');
    if(authenticated){
      return true; //cho phép dùng route
    }else{
      this.router.navigate(['/login'])
      return false; // khôg cho dùng route
    }


  })
}



}
