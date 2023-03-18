import { Component, OnInit } from '@angular/core';
import { Photo } from '../Photo';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  photos!: Photo[];

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.getAllPhotos().subscribe(
      response => {
        this.photos = <Photo[]>response;
        console.log("Got all photos response", this.photos);
      }
    );
  }

}
