import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // title = 'Profile Page Title';

  imageUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  // viewCount = 0;

  // name = 'saidur';

  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
      this.userService.getCurrentUserProfile().subscribe(
        userProfile => {
          this.user = <User>userProfile;
        }
      )
  }

  // incrementCount() {
  //   this.viewCount++;
  // }

}
