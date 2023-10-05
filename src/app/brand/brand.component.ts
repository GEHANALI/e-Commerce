import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit{

  brandD:any[]=[]
 
  constructor(private _DataService:DataService) { 
   
  }
  

  ngOnInit(): void {
    this.getbrand();
   
  }
  getbrand(){
    this._DataService.getdata('brands').subscribe((response)=>{
      this.brandD=response.data;

    })
  }
  
}
