import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
islogin:boolean=false;
cartNumber:number=0;

  constructor(private _auth:AuthService,private _cart:CartService){
    _cart.numberOfCartItem.subscribe({
      next:(response)=>{
      this.cartNumber=response
      }
    })
    _auth.userData.subscribe({
      next:()=>{
        if(_auth.userData.getValue() !== null){
          this.islogin=true;
              }else{
              this.islogin=false;
              }
      }
    })

  }


  logOut(){
    this._auth.logout();
  }
}
