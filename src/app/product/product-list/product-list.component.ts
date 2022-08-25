import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
    selector: 'product-list',
    templateUrl: 'product-list.component.html'
})

export class ProductListComponent implements OnInit {
    products?:Product[]
    constructor(public productService:ProductService) { }

    ngOnInit() {
        this.productService.getProducts().subscribe((res)=>{
            this.products=res.products
        })
     }

     deleteProduct(id:any){
        this.productService.deleteProduct(id).subscribe(()=>{
            this.productService.getProducts().subscribe((res)=>{
                this.products=res.products
            })
        })
    }
}