import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const userRoutes:Routes=[
    {path:'',redirectTo:"login",pathMatch:"full"},
    {path:"signup" , component:SignupComponent },
    {path:"login", component:LoginComponent}
]

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(userRoutes)
    ],
    exports: [],
    providers: [],
})
export class UserModule { }
