import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Photo } from './Photo';
import { Comment } from './Comment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  getAllPhotos() {
    var headers = this.getHeaders();
    //return this.http.get(environment.API_TEST_URL + "photos", {headers});
    return this.http.get(environment.API_BASE_URL + "photos", {headers});
  }

  getPhoto(photoId: string) {
    var headers = this.getHeaders();
    //return this.http.get(environment.API_TEST_URL + "photos/find/" + photoId, {headers});
    return this.http.get(environment.API_BASE_URL + "photos/find/" + photoId, {headers});
  }

  updatePhoto(photo: Photo) {
    var headers = this.getHeaders();
    console.log("Photo being sent: ", photo);
    //return this.http.put(environment.API_TEST_URL + "photos", photo, {headers});
    return this.http.put(environment.API_BASE_URL + "photos", photo, {headers});
  }

  getComments(photoId: string) {
    var headers = this.getHeaders();
    //return this.http.get(environment.API_TEST_URL + "comments/find-by-photoid/" + photoId, {headers});
    return this.http.get(environment.API_BASE_URL + "comments/find-by-photoid/" + photoId, {headers});
  }

  saveComment(photoId: any, newComment: any) {
    var headers = this.getHeaders();
    let comment: Comment = {
      id: "",
      photoId: photoId,
      message: newComment,
      createdBy: "",
      dateCreated: ""
    };

    //return this.http.post(environment.API_TEST_URL + "comments", comment, {headers});
    return this.http.post(environment.API_BASE_URL + "comments", comment, {headers});
  }

  makeProfilePhoto(photoUrl: string) {
    var headers = this.getHeaders();
    var params = new HttpParams().set('photoUrl', photoUrl);
    //return this.http.put(environment.API_TEST_URL + "users/me/profilePhoto", params, {headers});
    return this.http.put(environment.API_BASE_URL + "users/me/profilePhoto", params, {headers});
  }

  makeAlbumCoverPhoto(photoUrl: string, albumId: string) {
    var headers = this.getHeaders();
    var params = new HttpParams()
    .set('photoUrl', photoUrl)
    .set('albumId', albumId);
    //return this.http.put(environment.API_TEST_URL + "albums/updateCoverPhoto", params, {headers});
    return this.http.put(environment.API_BASE_URL + "albums/updateCoverPhoto", params, {headers});
  }

  getHeaders() {
    var headers = {
      'idToken': localStorage.getItem('userIdToken') ?? []
    };

    return headers;
  }

}
