import { Component, OnInit } from '@angular/core';
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

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }


  signUp(){
    this.authService.signUp(this.email, this.password)
  }
  
  signIn(){
    this.authService.signIn(this.email, this.password)
  }
}
