import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  signInFormVisible = true;

  name!: string;
  email!: string;
  password!: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }

  makeSignInFormVisible() {
    this.signInFormVisible = true;
  }

  makeSignUpFormVisible() {
    this.signInFormVisible = false;
  }

  login() {
    this.userService.logInUser(this.email, this.password);
    this.email = "";
    this.password = "";
  }

  signup() {
    console.log("tried to signup");
    this.userService.signUpUser(this.name, this.email, this.password);
    this.name = "";
    this.email = "";
    this.password = "";
  }

}
