import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
    private TokenTimer:any
    private token:string=""
    private userId:any=null
    private userRole:any=0
    private isUserAuth:boolean=false
    private authListener=new Subject<boolean>()
    constructor(private http:HttpClient ,public router:Router){ }
    public url=environment.path

    getToken(){
        return this.token
    }

    getUserId(){
        return this.userId
    }

    getUserRole(){
        return this.userRole
    }

    isAuth(){
        return this.isUserAuth
    }

    getAuthListener(){
        return this.authListener.asObservable()
    }

    updateAuthListener(){
        this.authListener.next(false)
    }

    createUser(email:string,password:string){
        const user={
            email:email,
            password:password
        }
        
        this.http.post(this.url+'/api/user/signup',user).subscribe(response=>{
            this.router.navigate(['/user/login'])
        })
        
    }

    loginUser(email:string,password:string){
        const user={
            email:email,
            password:password
        }
        this.http.post<{token:string,expiresIn:number,userId:string,userRole:number}>(this.url+'/api/user/login',user).subscribe(response=>{
            this.token=response.token
            if(this.token){
                const expiresIn=response.expiresIn
                this.setAuthTimer(expiresIn)
                this.userId=response.userId
                this.userRole=response.userRole
                this.isUserAuth=true
                this.authListener.next(true)
                const currentDate=new Date()
                const expirationDate=new Date(currentDate.getTime()+expiresIn*1000)
                this.saveAuthData(this.token,expirationDate,this.userId,this.userRole)
                this.router.navigate(['/home'])
            }           
        })
    }

    private setAuthTimer(duration:number){
        this.TokenTimer=setTimeout(()=>{
            this.logout()
        },duration*1000)
    }

    autoAuthUser(){
        const userInfo=this.getAuthData()
        if(!userInfo){
            return
        }
        const now=new Date()
        const expiresIn=userInfo.expirationDate.getTime() - now.getTime() 
        if(expiresIn > 0){
            this.token=userInfo!.token
            this.isUserAuth=true
            this.userId=userInfo.userId
            this.userRole=userInfo.userRole
            this.authListener.next(true)
            this.setAuthTimer(expiresIn/1000)
        }
    }
    
    logout() {
        this.token=""
        clearTimeout(this.TokenTimer)
        this.isUserAuth=false
        this.authListener.next(false)
        this.userId=null,
        this.userRole=0
        this.clearAuthData()
        this.router.navigate(['/'])
    }

    private saveAuthData(token:string,expirationDate:Date , userId:any,userRole:any){
        localStorage.setItem('token',token)
        localStorage.setItem('expiration',expirationDate.toISOString())
        localStorage.setItem('userid',userId)
        localStorage.setItem('userrole',userRole)
    }

    private clearAuthData(){
        localStorage.removeItem('token')
        localStorage.removeItem('expiration')
        localStorage.removeItem('userid')
        localStorage.removeItem('userrole')
    }

    private getAuthData(){
        const token=localStorage.getItem('token')
        const expirationDate=localStorage.getItem('expiration')
        const userId=localStorage.getItem('userid')
        const userRole=localStorage.getItem('userrole')
        if(!token || !expirationDate || !userId || !userRole){
            return
        }
        return{
            token:token,
            expirationDate:new Date(expirationDate),
            userId:userId,
            userRole:userRole
        }
    }
}