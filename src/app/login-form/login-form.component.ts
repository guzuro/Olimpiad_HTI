import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
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

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }


  signUp(){
    this.authService.signUp(this.email, this.password)
  }
  
  signIn(){
    this.authService.signIn(this.email, this.password)
  }
}
