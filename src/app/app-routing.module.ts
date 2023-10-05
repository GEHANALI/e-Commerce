import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { BrandComponent } from './brand/brand.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MycartComponent } from './mycart/mycart.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { authGuard } from './auth.guard';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { RestpassComponent } from './restpass/restpass.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  {path:'',redirectTo:'signin',pathMatch:'full'},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',canActivate:[authGuard],component:HomeComponent},
  {path:'category',canActivate:[authGuard],component:CategoriesComponent},
  {path:'detailsP/:id',canActivate:[authGuard],component:ProductdetailsComponent},
  {path:'product',canActivate:[authGuard],component:ProductsComponent},
  {path:'brand',canActivate:[authGuard],component:BrandComponent},
  {path:'wish',canActivate:[authGuard],component:WishlistComponent},
  {path:'check',canActivate:[authGuard],component:CheckoutComponent},
  {path:'forget',component:ForgetpassComponent},
  {path:'reset',component:RestpassComponent},
  {path:'mycart',canActivate:[authGuard],component:MycartComponent},
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
