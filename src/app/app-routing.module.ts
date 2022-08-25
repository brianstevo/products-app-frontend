import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';
import { ErrorComponent } from './common-service/error/error.component';
import { HomeComponent } from './home/home.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductListComponent } from './product/product-list/product-list.component';

const routes: Routes = [
  {path:"admin",component:AdminComponent,canActivateChild:[AdminGuard],
  children:[
    {path:'',redirectTo:"products/view",pathMatch:"full"},
    {path:"products/create" , component: ProductCreateComponent},
    {path:"products/view" , component: ProductListComponent},
    {path:"products/edit/:id" , component: ProductCreateComponent},
    
  ]},
  {path:"user",
  loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {path:"home",component:HomeComponent},
  {path:"error",component:ErrorComponent},
  {path:'',redirectTo:"/home",pathMatch:"full"},
  {path:'**',redirectTo:"error",pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
