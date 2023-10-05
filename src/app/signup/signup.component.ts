import { Component } from '@angular/core'; 
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  
  errorM:string='';
  loading:boolean=false;

  constructor(private _auth:AuthService){

  }
registerForm:FormGroup=new FormGroup({

  name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z][0-9]{4,8}')]),
  rePassword:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z][0-9]{4,8}')]),
  phone:new FormControl(null,[Validators.required,Validators.pattern('^01[0125][0-9]{8}')]),
},{validators:this.repassword})

repassword(form:any){
let pass=form.get('password')
let repass=form.get('rePassword')
if(pass.value===repass.value){
  return null
}else{
  repass.setErrors({repasswordMatch:'repassword not macthing the password'})
  return{repasswordMatch:'repassword not macthing the password'}
}
}

signup(formData:FormGroup){
  this.loading=true;
this._auth.signup(formData.value).subscribe({
  next:(response)=>{console.log(response)
  this.loading=false;
  },
  error:(error)=>{
 this.errorM=error.error.message
 this.loading=false;
  }
})
}
}


