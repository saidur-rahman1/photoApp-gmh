import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { Photo } from '../Photo';
import { AlbumService } from '../album.service';
import { Album } from '../Album';
import { PhotoService } from '../photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {

  albumName!: string;

  constructor(private fileService: FileService, 
    private albumService: AlbumService, 
    private photoService: PhotoService,
    private router: Router) {}

  ngOnInit(): void {
      
  }

  createAlbum(event: any) {
    console.log(event.files[0]);
    this.fileService.uploadFile(event.files[0]).subscribe(
      fileResponse => {
        let photo = <Photo>fileResponse;
        this.saveAlbum(photo.id, photo.photoUrl);
        console.log(fileResponse);
      }
    )
  }

  saveAlbum(photoId: string, photoUrl: string) {
    this.albumService.saveAlbum(this.albumName, photoUrl).subscribe(
      albumResponse => {
        let album = <Album>albumResponse;
        this.photoService.getPhoto(photoId).subscribe(
          photoResponse => {
            let photo = <Photo>photoResponse;
            photo.albumId = album.id;
            this.photoService.updatePhoto(photo).subscribe();
          }
        )
        this.router.navigate(['albums/', album.id]);
        this.albumService.getPhotos(album.id).subscribe();
      }
    )
  }

}
