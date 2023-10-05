import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  categoryD:any[]=[]
  constructor(private _DataService:DataService ,private _cartservices:CartService) { 
 
  }
  

  ngOnInit(): void {
    this.getcategory();
  }


  getcategory(){
    this._DataService.getdata('categories').subscribe((response)=>{
      this.categoryD=response.data

    })
  }
}
