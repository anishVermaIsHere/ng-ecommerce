import { Component } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})

export class LoginComponent {
  isLogin=false;
  loginForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private authService:AuthService){
    this.loginForm=this.formBuilder.group({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.min(6),Validators.max(16)])
    })
  
  }


  onSubmit(){
    const email=this.loginForm.value.email;
    const password=this.loginForm.value.password;
    if(email=='davidpaul@test.com'&&password=='david12345'){
      this.authService.login();
    } else alert('Invalid input');
    this.loginForm.reset();
  }
}
