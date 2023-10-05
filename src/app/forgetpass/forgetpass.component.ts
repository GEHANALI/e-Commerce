import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.scss']
})
export class ForgetpassComponent {

successM:string=''
errorM:string=''
errrest:string=''


  constructor(private _auth:AuthService,private _router:Router){}

  forgetForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })


  forgetpass(forgetForm:FormGroup){
   this._auth.forgetpass(forgetForm.value).subscribe({
  next:(response)=>{
    this.successM=response.message;
    this.errorM=''
    document.querySelector('.forgetpass')?.classList.add('d-none')
    document.querySelector('.verifycode')?.classList.remove('d-none')

  },
  error:(err)=>{
    this.errorM=err.error.message;
  }
})
  }

  verifyForm:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required])
  })

  verifyCode(verifyCode:FormGroup){
    console.log(verifyCode)
    this._auth.verifycode(verifyCode.value).subscribe({
      next:( response)=>{
        if(response.status == 'Success'){
          this._router.navigate(['./reset'])

        }
      },
      error:(err)=>{
    
      this.errrest=err.error.message
      }
    })

  }
}
