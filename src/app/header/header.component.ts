import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../common-service/auth.service';

@Component({
    selector: 'Header',
    templateUrl: 'header.component.html',
    styles:[`
      nav{
        margin-bottom:40px;
      }
    `]
})

export class HeaderComponent implements OnInit ,OnDestroy {
  isUserAuthenticated:boolean=false
  userRole:number=0
  private authSubsciptionListener!: Subscription;
  constructor(private authService:AuthService) { }
  
  ngOnDestroy(){
    this.authSubsciptionListener.unsubscribe()
  }

  ngOnInit() { 
    this.isUserAuthenticated=this.authService.isAuth()
    this.userRole=this.authService.getUserRole()
    this.authSubsciptionListener=this.authService.getAuthListener().subscribe(isAuthenticated=>{
      this.isUserAuthenticated=isAuthenticated
      if(!isAuthenticated){
        this.userRole=0
      }else{
        this.userRole=this.authService.getUserRole()
      }       
    })
  } 
  logout(){
    this.authService.logout()
  }
}
