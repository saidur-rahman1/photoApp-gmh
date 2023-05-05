import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Album } from './Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAllAlbums() {
    var headers = this.getHeaders();
    //return this.http.get(environment.API_TEST_URL + "albums", {headers});
    return this.http.get(environment.API_BASE_URL + "albums", {headers});
  }

  getMyAlbums() {
    var headers = this.getHeaders();
    //return this.http.get(environment.API_TEST_URL + "albums/me", {headers});
    return this.http.get(environment.API_BASE_URL + "albums/me", {headers});
  }

  getPhotos(albumId: String) {
    var headers = this.getHeaders();
    //return this.http.get(environment.API_TEST_URL + "albums/" + albumId + "/photos", {headers});
    return this.http.get(environment.API_BASE_URL + "albums/" + albumId + "/photos", {headers});
  }

  saveAlbum(albumName: string, photoUrl: string) {
    var headers = this.getHeaders();
    let album: Album = {
      id: "",
      name: albumName,
      coverPhotoUrl: photoUrl,
      createdBy: "",
      dateCreated: "",
    };

    //return this.http.post(environment.API_TEST_URL + "albums", album, {headers});
    return this.http.post(environment.API_BASE_URL + "albums", album, {headers});
  }

  // http://18.234.190.188:8080/api/albums -> my AWS IP
  // http://localhost:8080/api/albums
  // http://3.20.59.181:8000/api/albums/all -> mentor's IP
  //

  getHeaders() {
    var headers = {
      'idToken': localStorage.getItem('userIdToken') ?? []
    };

    return headers;
  }

}
