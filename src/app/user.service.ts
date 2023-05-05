import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { CanActivate, Router } from '@angular/router';
import { inject } from '@angular/core/testing';
import { User } from './User';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';

//import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {

  user: Observable<firebase.User | null>;
  defaultProfilePic: string = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  constructor(private firebaseAuth: AngularFireAuth, 
    private router: Router, 
    private http: HttpClient,
    private messageService: MessageService) {
      this.user = firebaseAuth.authState;

      this.user.subscribe(
        userInfo => {
          //console.log("Info available", userInfo?.getIdToken());
          if (userInfo != null) {
            this.saveIdToken(userInfo);
          }
          
        }
      );
  }

  canActivate(): boolean {
      // const user = JSON.parse(localStorage.getItem('userIdToken')!);
      //   return user !== 'null' ? true : false;
      // if (this.user) {
      //   console.log("Current User: ", this.firebaseAuth);
      //   return true;
      // }
      const token = localStorage.getItem("userIdToken");
      if (token || this.user) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }

  // storeIdToken(idToken: Promise<string>) {
  //   idToken.then(
  //     idTokenValue => {
  //       localStorage.setItem("userIdToken", idTokenValue);
  //     }
  //   );
  // }

  saveIdToken(firebaseUser: firebase.User) {
    console.log("FirebaseUser: ", firebaseUser);
    firebaseUser.getIdToken().then(
      idTokenValue => {
        localStorage.setItem("userIdToken", idTokenValue);
      }
    );
    console.log("Saved Id Token", localStorage.getItem("userIdToken"));
  }

  logInUser(email: string, password: string) {
    this.firebaseAuth['signInWithEmailAndPassword'](email, password).then(
      (value: any) => {
        this.saveIdToken(value.user);
        this.router.navigate(['/albums/recent']);
      },
      (error: any) => {
        this.messageService.newMessage(error.message);
      }
    )
  }

  signUpUser(name: string, email: string, password: string) {
    this.firebaseAuth['createUserWithEmailAndPassword'](email, password).then(
      (value: any) => {
        console.log('user sign up successful', value);
        this.saveIdToken(value.user);
        this.registerUser(name, email);
      },
      (error: any) => {
        this.messageService.newMessage(error.message);
      }
    )
  }

  registerUser(name: string, email: string) {

    let user: User = {
      id: "",
      name: name,
      address: "",
      profilePicUrl: this.defaultProfilePic,
      age: 0,
      email: email,
    };

    var headers = this.getHeaders();
    //this.http.post(environment.API_TEST_URL + "users", user, {headers})
    this.http.post(environment.API_BASE_URL + "users", user, {headers})
    .subscribe( response => {
      console.log("registration successful");
      this.router.navigate(['/albums/recent']);
    });
  }

  logOutUser() {
    this.firebaseAuth.signOut().then(
      ()=> {
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      (error: any) => {
        this.messageService.newMessage(error.message);
      }
    )
  }

  getCurrentUserProfile() {
    var headers = this.getHeaders();
    //return this.http.get(environment.API_TEST_URL + "users/me", {headers});
    return this.http.get(environment.API_BASE_URL + "users/me", {headers});
  }

  getHeaders() {
    var headers = {
      'idToken': localStorage.getItem('userIdToken') ?? []
    };

    return headers;
  }

}
