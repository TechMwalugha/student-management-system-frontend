import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  saveStudentDataInDB(){
    const uploadApiUrl = `${environment.apiUrl}/files/upload`;

    return this.http.post<{message: string}>(uploadApiUrl, {})
  }
}
