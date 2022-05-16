import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebaseConfig)

@Injectable({
  providedIn: 'root'
})
export class FileUploaderServService {

  storareRef= firebase.app().storage().ref();

  private urlUploads: string = "http://localhost:8080/portfolio"

  constructor(private http: HttpClient) { }


   upload(file: File): Observable<HttpEvent<any>> {
     const formData: FormData = new FormData();
     formData.append('file', file);
     const req = new HttpRequest('POST', `${this.urlUploads}/upload`, formData, {
       reportProgress: true,
       responseType: 'json'
     });
     return this.http.request(req);
   }

   getFiles(): Observable<any> {
     return this.http.get(`${this.urlUploads}/files`);
   }

}