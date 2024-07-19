import { Whishlist3Component } from './components/whishlist3/whishlist3.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { orderGuard } from './order.guard';


const routes: Routes = [
  {path:'',component:BlankLayoutComponent ,children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',canActivate:[authGuard],component:HomeComponent},
    {path:'allorders',canActivate:[orderGuard],component:HomeComponent,title:'Home'},
    {path:'cart',canActivate:[authGuard],component:CartComponent},
    {path:'products',canActivate:[authGuard],component:ProductsComponent},
    {path:'categories',canActivate:[authGuard],component:CategoriesComponent},
    {path:'brands',canActivate:[authGuard],component:BrandsComponent},
    {path:'details/:id',canActivate:[authGuard],component:DetailsComponent},
    {path:'checkOut/:id',component:CheckOutComponent},

    {path:'setting',loadChildren:()=>import('./setting/setting.module').then((m)=>m.SettingModule)},

    {path:'whishList',canActivate:[authGuard],component:Whishlist3Component},



  ]},
  {
    path:'',component:AuthLayoutComponent,children:[

      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},
    ]
  }
  ,
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
