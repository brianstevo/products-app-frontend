import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../common-service/auth.service';

@Component({
    selector: 'signup',
    templateUrl: 'signup.component.html',
    styles:[`
    .not-active{
        color: rgba(0,0,0,.6);
        background-color: #eee;
    }
    `]
})

export class SignupComponent implements OnInit {
    constructor(public authService:AuthService) { }

    ngOnInit() { }

    signup(form:NgForm){
        if(form.invalid)
            return
        this.authService.createUser(form.value.email,form.value.password)
    }
}