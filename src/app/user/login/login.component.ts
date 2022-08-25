import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common-service/auth.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styles:[`
    .not-active{
        color: rgba(0,0,0,.6);
        background-color: #f5f5f5;
    }
    `]
    
})

export class LoginComponent implements OnInit{
    constructor(public authService:AuthService ){ }

    ngOnInit() { }
    
    login(form:NgForm){
        if(form.invalid)
            return
        this.authService.loginUser(form.value.email,form.value.password)      
    }
}
