import { Component, OnInit } from '@angular/core';
import { Photo } from '../Photo';
import { Comment } from '../Comment';
import { PhotoService } from '../photo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  photo!: Photo;
  photoId!: string | null;
  allComments!: Comment[];

  latestTop!: boolean;

  newComment!: string | null;

  constructor(private route: ActivatedRoute, private photoService: PhotoService) {}

  ngOnInit(): void {
    // this.photoService.getAllPhotos().subscribe(
    //   response => {
    //     this.photo = <Photo[]>response;
    //     console.log("Got all photos response", this.photo);
    //   }
    // );

    this.route.paramMap.subscribe(params => {
      this.photoId = params.get('photoId');
      if (this.photoId != null) {
        this.loadPhoto(this.photoId);
        this.loadComments(this.photoId);
      }
      
      // if (this.photoId != null) {
      //   this.photoService.getPhoto(this.photoId).subscribe(
      //     photo => {
      //       this.photos = <Photo[]>photo;
      //       console.log("Get photos for this album: ", this.photos);
      //     }
      //   );
      // }

      //Tech
      // https://imageio.forbes.com/specials-images/imageserve/61d52d4e3a76ed81ac034ea8/The-10-Tech-Trends-That-Will-Transform-Our-World/960x0.jpg

      //AI
      // https://assets.gatesnotes.com/8a5ac0b3-6095-00af-c50a-89056fbe4642/e675f5c2-624b-4efd-b82f-99e8a6ed968b/AI_20230215_new%20module_1200x580.jpg

      //Nature
      // https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg

    });

  }

  loadPhoto(photoId: string) {
    this.photoService.getPhoto(photoId).subscribe(
      photo => {
        this.photo = <Photo>photo;
      }
    );
  }

  loadComments(photoId: string) {
    this.photoService.getComments(photoId).subscribe(
      comments => {
        this.latestTop = true;
        this.allComments = (<Comment[]>comments).reverse();
      }
    );
  }

  saveComment() {
    this.photoService.saveComment(this.photoId, this.newComment).subscribe(
      response => {
        if (this.photoId != null) {
          this.loadComments(this.photoId);
        }
        this.newComment = "";
      }
    );
  }

  changeOrder(photoId: string) {
    this.latestTop = !this.latestTop;
    this.photoService.getComments(photoId).subscribe(
      comments => {
        if (this.latestTop) {
          this.allComments = (<Comment[]>comments).reverse();
        } else {
          this.allComments = (<Comment[]>comments);
        }
      }
    );
    
  }

  makeProfilePhoto() {
    this.photoService.makeProfilePhoto(this.photo.photoUrl).subscribe(
      response => {
        console.log("Profile photo updated");
      }
    );
  }

  makeAlbumCoverPhoto() {
    this.photoService.makeAlbumCoverPhoto(this.photo.photoUrl, this.photo.albumId).subscribe(
      response => {
        console.log("Album cover photo updated");
      }
    );
  }

}
