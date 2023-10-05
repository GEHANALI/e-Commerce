import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})

export class ProductdetailsComponent {
productId:any;
productDetails:any

  constructor(private _Activat:ActivatedRoute,private _DataService:DataService,private _cartservices:CartService){
    this._Activat.paramMap.subscribe((idd)=>{
      this.productId=idd.get('id')
    })
    this.getdetils()
  }

  addTocart(productId:string){
    this._cartservices.addToCart(productId).subscribe({
      next:(response)=>{console.log(response)
      if(response.status == 'success'){
        this._cartservices.numberOfCartItem.next(response.numOfCartItems)
        Swal.fire({
          icon: 'success',
          title: '',
          text: response.message,
        })
      }
      },
      error:(err)=>{console.log(err)}
    })
  }

  getdetils(){
    this._DataService.getproductD(this.productId).subscribe((response)=>{

      this.productDetails=response.data
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }
}
