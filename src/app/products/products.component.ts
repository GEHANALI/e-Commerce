import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productD:any[]=[]
  searchValue:string=''
  constructor(private _DataService:DataService ,private _cartservices:CartService) { 
 
  }
  ngOnInit(): void {
   
    this.getproduct(); 
  }
  

  getproduct(){
    this._DataService.getdata('products').subscribe((response)=>{
      this.productD=response.data

    })
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
  
  addToWish(productId:string){
    this._cartservices.addToWishlist(productId).subscribe({
      next:(response)=>{console.log(response)
        if(response.status == 'success'){
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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
}
