import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { CanActivate, Router } from '@angular/router';
import { inject } from '@angular/core/testing';

//import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {

  user: Observable<firebase.User | null>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
      this.user = firebaseAuth.authState;

      //console.log("Initial userIdToken", localStorage.getItem("userIdToken"));

      console.log("User details: ", this.user);

      this.user.subscribe(
        userInfo => {
          console.log("Info available", userInfo?.getIdToken());
          if (userInfo != null) {
            this.storeIdToken(userInfo.getIdToken());
          }
          
        }
      );
  }

  canActivate(): boolean {
      // const user = JSON.parse(localStorage.getItem('userIdToken')!);
      //   return user !== 'null' ? true : false;
      if (this.user) {
        console.log("Current User: ", this.firebaseAuth);
        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }

  storeIdToken(idToken: Promise<string>) {
    idToken.then(
      idTokenValue => {
        localStorage.setItem("userIdToken", idTokenValue);
        //console.log("Id Token Value: ", localStorage.getItem("userIdToken"));
      }
    );
  }

  logInUser(email: string, password: string) {
    this.firebaseAuth['signInWithEmailAndPassword'](email, password).then(
      (value: any) => {
        this.router.navigate(['/albums/recent']);
      },
      (error: any) => {
        console.log('error logging in: ', error);
      }
    )
  }

  signUpUser(email: string, password: string) {
    this.firebaseAuth['createUserWithEmailAndPassword'](email, password).then(
      (value: any) => {
        //console.log('user sign up successfull', value);
        this.router.navigate(['/albums/recent']);
      },
      (error: any) => {
        console.log('user sign up error');
      }
    )
  }

  logOutUser() {
    this.firebaseAuth.signOut().then(
      ()=> {
        console.log('user sign out');
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.log('Error logging out');
      }
    )
  }

}
