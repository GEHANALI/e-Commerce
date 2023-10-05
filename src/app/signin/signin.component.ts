import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  errorM:string='';
  loading:boolean=false;

  constructor(private _auth:AuthService,private _Router:Router){

  }

  loginForm:FormGroup=new FormGroup({

    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z][0-9]{4,8}')]),
  })

  signin(formLog:FormGroup){
    console.log('hi')
    this.loading=true;
  this._auth.login(formLog.value).subscribe({
    next:(response)=>{
console.log('hi from response')
      if(response.message=='success'){
        localStorage.setItem('userToken',response.token)
        this._auth.decodeduserData()
        this._Router.navigate(['/home'])

      }
    this.loading=false;
    },
    error:(err)=>{
    console.log('hi error',err)
   this.errorM=err.error.message;
   this.loading=false;
    }
  })
  }
}

