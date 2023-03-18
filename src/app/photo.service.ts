import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  getAllPhotos() {
    var headers = this.getHeaders();
    return this.http.get("http://18.234.190.188:8080/api/photos", {headers});
  }

  getHeaders() {
    var headers = {
      'idToken': localStorage.getItem('userIdToken') ?? []
    };

    return headers;
  }

}
