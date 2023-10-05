import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-restpass',
  templateUrl: './restpass.component.html',
  styleUrls: ['./restpass.component.scss']
})
export class RestpassComponent {
  errorM:string='';
  loading:boolean=false;

  constructor(private _auth:AuthService,private _Router:Router){

  }

  resetForm:FormGroup=new FormGroup({

    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z][0-9]{4,8}')]),
  })

  resetpass(formLog:FormGroup){
    this.loading=true;
console.log(formLog)
this._auth.resetpass(formLog.value).subscribe({
  next:(response)=>{
    console.log(response)
    this.loading=false;
    if(response.token){
      this._Router.navigate(['/signin'])
    }
  },
  error:(err)=>{
    console.log(err)
    this.loading=false;
    this.errorM=err.error.message
  }
})
  
  }
}
