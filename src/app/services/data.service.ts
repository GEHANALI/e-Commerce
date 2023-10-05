import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseurl:string=`https://ecommerce.routemisr.com/api/v1/`;
  constructor(private _HttpClient:HttpClient) { }
  
  getdata(dataType:string):Observable<any>{
   return this._HttpClient.get(this.baseurl+dataType)
  }
getproductD(id:string):Observable<any>{
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

}
getbrandD(id:string):Observable<any>{
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)

}
}