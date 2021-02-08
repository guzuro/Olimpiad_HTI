import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth, private afs:AngularFirestore, private router: Router) { }

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
        this.router.navigate(['user-dashboard'])
      })
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
      })
    }, err => {
      switch (err.message) {
        case 'signInWithEmailAndPassword failed: First argument "email" must be a valid string.':
          // this.alert.error("Введите Email", "");
          break;
        case 'signInWithEmailAndPassword failed: Second argument "password" must be a valid string.':
          // this.alert.error("Введите пароль", "");
          break;
        case 'There is no user record corresponding to this identifier. The user may have been deleted.':
          // this.alert.error("не существующий пользователь", "");
          break;
        case 'The password is invalid or the user does not have a password.':
          // this.alert.error("не верный пароль", "");
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