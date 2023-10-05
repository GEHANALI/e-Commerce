import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categoryD:any[]=[]
  productD:any[]=[]
  brandD:any[]=[]
  searchValue:string=''
  constructor(private _DataService:DataService ,private _cartservices:CartService) { 
 
  }
  

  ngOnInit(): void {
    this.getcategory();
    this.getbrand();
    this.getproduct(); 
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
          document.getElementById('heart')?.classList.add('text-danger')
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


  getcategory(){
    this._DataService.getdata('categories').subscribe((response)=>{
      this.categoryD=response.data

    })
  }
  
  getproduct(){
    this._DataService.getdata('products').subscribe((response)=>{
      this.productD=response.data

    })
  }

  
  getbrand(){
    this._DataService.getdata('brands').subscribe((response)=>{
      this.brandD=response.data.slice(0,4);

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
        items: 5
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
}
