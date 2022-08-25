import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
    selector: 'product-create',
    templateUrl: 'product-create.component.html'
})

export class ProductCreateComponent implements OnInit {
    form!:FormGroup
    mode:string='create';
    productId?:any;
    constructor(public productService:ProductService, public route:ActivatedRoute,public router:Router) { }

    ngOnInit() {
        this.form=new FormGroup({
            name: new FormControl('' ,{validators:[Validators.required,Validators.minLength(3)]}),
            description: new FormControl('' ,{validators:[Validators.required,Validators.minLength(3)]}),
            price: new FormControl('' ,{validators:[Validators.required]}),
            category: new FormControl('',{validators:[Validators.required,Validators.minLength(3)]})
          })
        this.route.paramMap.subscribe((paramMap:ParamMap)=>{
            if(paramMap.has('id')){
                console.log(paramMap);
                
                this.mode='edit'
                this.productId=paramMap.get('id')
                console.log(this.productId);
                
                this.productService.getPost(this.productId).subscribe(productData=>{
                    console.log(productData);                   
                    this.form?.setValue({
                        name: productData.product.name,
                        description: productData.product.description,
                        price: productData.product.price,
                        category: productData.product.category
                    })
                })
            } else {
                this.mode='create'
                this.productId=null
            }
        })
     }
    
    createProduct(form:FormGroup){
        if(form.invalid){
            return
        }

        if(this.mode==='create'){
            this.productService.createProduct(form.value.name,form.value.description,form.value.price,form.value.category)
        }
        else{
            this.productService.updateProduct(this.productId,form.value.name,form.value.description,form.value.price,form.value.category)
        }      
        this.form!.reset()
    }
    cancel(){
        this.router.navigate(['/admin/products/view'])
    }
}