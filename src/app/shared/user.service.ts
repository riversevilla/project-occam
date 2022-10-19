import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginTestUrl: string = 'https://api.occamlab.com.sg/demo-occamlab/login-test';
  private uploadTestUrl: string = 'https://api.occamlab.com.sg/demo-occamlab/upload-test';

  constructor(
    private http: HttpClient
  ) { }

  loginUser(): Observable<{status: boolean, auth_token: string}> {
    const httpOptions = {
      headers: new HttpHeaders({'accept': 'application/json', 'content-type': 'application/json'}),
    };
    const userData = {
      email: "sample-user@test.com",
      password: "sample-password"
    };

    return this.http.post<{status: boolean, auth_token: string}>(this.loginTestUrl, JSON.stringify(userData), httpOptions);
  }

  uploadImage(image: Blob, authToken: string): Observable<{status: boolean, image_url: string}> {
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': authToken}),
    };

    return this.http.post<{status: boolean, image_url: string}>(this.uploadTestUrl, image, httpOptions);
  }
}
