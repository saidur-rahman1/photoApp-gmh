import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAllAlbums() {
    var headers = this.getHeaders();
    return this.http.get("http://18.234.190.188:8080/api/albums", {headers});
  }

  // http://18.234.190.188:8080/api/albums -> my AWS IP
  // http://localhost:8080/api/albums
  // http://3.20.59.181:8000/api/albums/all -> mentor's IP

  getHeaders() {
    var headers = {
      'idToken': localStorage.getItem('userIdToken') ?? []
    };

    return headers;
  }

}
