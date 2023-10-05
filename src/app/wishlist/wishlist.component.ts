import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{

  wishDetails:any
  constructor(private _cart:CartService) {

  }
  ngOnInit(): void {
    this.getWish()
  }
  removeItem(productId:string){
    this._cart.removeCartItem(productId).subscribe({
      next:(response)=>{console.log(response)
      this.wishDetails=response.data
    },
      error:(err)=>{console.log(err)}
    })
  }


  getWish(){
    this._cart.getLoggedUserWish().subscribe({
      next:(response)=>{
        console.log(response.data)
        this.wishDetails=response.data

  }
    })
  }
}
