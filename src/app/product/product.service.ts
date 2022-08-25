import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from './product.model';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ProductService {
    url=environment.path
    constructor(private http: HttpClient , private router:Router) { }
    
    createProduct(name:string,description:string,price:number,category:string){
        const body={
            name:name,
            description:description,
            price:price,
            category:category
        }
        this.http.post<{message:string}>(this.url+'/api/products',body).subscribe((res)=>{
        })
        this.router.navigate(['/admin/products/view'])
    }

    getProducts(){
        return this.http.get<{message:string,products:Product[],totalProducts:number}>(this.url+'/api/products')
    }
    deleteProduct(id:any){
        return  this.http.delete<{message:string}>(this.url+'/api/products/'+id)
    }

    getPost(id:any){
        return this.http.get<{message:string,product:Product}>(this.url+'/api/products/'+id)
    }

    updateProduct(id:any,name:string,description:string,price:number,category:string) {
        const body={
            name:name,
            description:description,
            price:price,
            category:category
        }

        this.http.put<{message:string}>(this.url+'/api/products/'+id,body)
        .subscribe((res)=>{
        })
        this.router.navigate(['/admin/products/view'])
    }
}