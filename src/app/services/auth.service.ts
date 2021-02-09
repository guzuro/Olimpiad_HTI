import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AlertService } from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth, private afs:AngularFirestore, private router: Router, private alert:AlertService) { }

  _role:string;

  get userRole(){
    this._role = localStorage.getItem('role')
    return this._role;
  }

  get isAuth(){
    if(JSON.parse(localStorage.getItem('user'))) return true;
    else return false
  }

  authState = this.auth.authState.subscribe(user=>{
    if(user===null){
      this._role = "";
    } else{
      localStorage.setItem("user", JSON.stringify(user))
    }
  })

  signUp(email, password) {
    this.auth.createUserWithEmailAndPassword(email, password).then(responseUser => {
      return this.afs.collection("users").doc(responseUser.user.uid).set({
        email: responseUser.user.email,
        id: responseUser.user.uid,
        orders: [],
        role: "Клиент"
      }).then(()=>{
        localStorage.setItem('role', "Клиент")
        this.router.navigate(['/user/user-dashboard'])
        this.alert.success("Вы зарегистрировались");
      })
    }, err=>{
      switch (err.code) {
        case 'auth/invalid-email':
          this.alert.error("Неверный email");
        break;
        case 'auth/email-already-in-use':
          this.alert.error("Такой Email уже используется");
          break;
        case "auth/weak-password":
          this.alert.error("Слабый пароль");
          break;
      }
    })
  }

  signIn(email, password) {
    this.auth.signInWithEmailAndPassword(email, password).then((responseUser) => {
      const docRef = this.afs.collection('users').doc(responseUser.user.uid).get()
      docRef.subscribe(data=>{
        let user = data.data() as User;
        localStorage.setItem('role', user.role)
        if (user.role == 'Клиент'){
          this.router.navigate(['/user/user-dashboard'])
        } else {
          this.router.navigate(['/admin'])
        }
        this.alert.success("Вход выполнен");

      })
    }, err => {
      switch (err.code) {
        case 'auth/invalid-email':
          this.alert.error("Неверный email");
        break;
        case 'auth/user-not-found':
          this.alert.error("не существующий пользователь");
          break;
        case "auth/wrong-password":
          this.alert.error("не верный пароль");
          break;
      }
    })
  }

  logout(){
    localStorage.clear();
    this.auth.signOut();
    this.router.navigate(['login'])
  }

}