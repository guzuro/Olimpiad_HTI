import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: [
  ]
})

export class LoginFormComponent implements OnInit {

  email:string;
  password:string;
  message:string;

  constructor(public authService:AuthService, private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params)=>{
      if(params['loginFirst']){
        this.message = "Для начала войдите в аккаунт"
      }
    })

  }


  signUp(){
    this.authService.signUp(this.email, this.password)
  }
  
  signIn(email?:string, password?:string){
    if(email && password) {
      this.password = "";
      this.email = "";
    }
   this.authService.signIn(this.email || email, this.password || password)
  }
}
