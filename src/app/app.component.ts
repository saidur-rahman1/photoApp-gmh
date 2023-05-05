import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MyPhotoApplication';

  constructor(public userService: UserService, public messageService: MessageService) {}

  ngOnInit(): void {
      
  }

  logout() {
    console.log("logged out");
    this.userService.logOutUser();
  }

  clearMessages() {
    this.messageService.clearMessages();
  }

}
