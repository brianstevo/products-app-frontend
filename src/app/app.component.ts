import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './common-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit() {
    this.authService.autoAuthUser()
    window.addEventListener('storage', (event) => {
      if (event.storageArea == localStorage) {
           let token = localStorage.getItem('token');
           if(token == undefined) { 
            this.authService.updateAuthListener()
            this.router.navigate(['/user/login']); 
           }
      }
  });
  }
}
