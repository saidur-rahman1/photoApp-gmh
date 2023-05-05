import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../file.service';
import { Photo } from '../Photo';
import { PhotoService } from '../photo.service';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})
export class UploadPictureComponent implements OnInit {

  albumId: string | null | undefined;

  constructor(private route: ActivatedRoute, 
    private fileService: FileService,
    private photoService: PhotoService,
    private albumService: AlbumService,
    private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.albumId = params.get('albumId');
    });
  }

  uploadPhoto(event: any) {
    this.fileService.uploadFile(event.files[0]).subscribe(
      fileResponse => {
        let photo = <Photo>fileResponse;
        if (this.albumId != null) {
          photo.albumId = this.albumId;
        }
        this.photoService.updatePhoto(photo).subscribe();
        this.router.navigate(['albums/', this.albumId]);
        if (this.albumId != null) {
          this.albumService.getPhotos(this.albumId).subscribe();
        }
      }
    )
  }

}
