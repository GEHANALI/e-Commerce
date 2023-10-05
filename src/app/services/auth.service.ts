import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{BehaviorSubject, Observable} from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData=new BehaviorSubject(null);
  baseUrl:string=`https://ecommerce.routemisr.com`
  
  constructor(private _HttpClient:HttpClient,private _router:Router) { 
    if(localStorage.getItem('userToken')!== null){
      this.decodeduserData()
    }
  }

 signup(formData:any):Observable<any>{
 return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`,formData)
 }

 login(formData:any):Observable<any>{
  console.log('hiiiiii')
  return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`,formData)
  }

  decodeduserData(){
    let codedToken=JSON.stringify(localStorage.getItem('userToken'))
    let decodedToken:any=jwtDecode(codedToken)
    this.userData.next(decodedToken);
 
  }

  logout(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._router.navigate(['./signin'])
  }

  forgetpass(formData:any):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`,formData)
    }

    verifycode(formData:any):Observable<any>{
      return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`,formData)
      }

      resetpass(formData:any):Observable<any>{
        return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`,formData)
        }
}
