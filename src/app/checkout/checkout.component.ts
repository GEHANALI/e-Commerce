import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
  productId:string=''
  constructor(private _cart:CartService){}

  payment:FormGroup=new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null)
  })

   navigateToPage(url:string){
    window.location.href=url
   }

ngOnInit(): void {
  this._cart.getLoggedUserCart().subscribe({
    next:(response)=>{
    this.productId=response.data._id
  }

  })
}

  onlinePayment(payment:FormGroup){
console.log(payment)
this._cart.handelPayment(  this.productId,payment.value).subscribe({
  next:(response)=>{
    if(response.status == 'success'){
      this.navigateToPage(response.session.url)

    }
    console.log(response)
  }
})
  }
}
