import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    var headers = this.getHeaders();

    var formData = new FormData();
    formData.append("file", file);

    return this.http.post(environment.API_BASE_URL + "files", formData, {headers})
    //return this.http.post(environment.API_TEST_URL + "files", formData, {headers});
  }

  getHeaders() {
    var headers = {
      'idToken': localStorage.getItem('userIdToken') ?? []
    };

    return headers;
  }
}
