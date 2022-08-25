import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../common-service/auth.service";

@Injectable({providedIn:'root'})
export class AdminGuard implements CanActivateChild{

    constructor(private authService:AuthService,private router:Router){}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {      
        const isAuthenticated=this.authService.isAuth()
        const userRole=this.authService.getUserRole()            
        if(!isAuthenticated && userRole!=1){
            this.router.navigate(['/home'])
        }
        return isAuthenticated;
    }
}