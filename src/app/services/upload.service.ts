import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  saveStudentDataInDB(){
    const token = localStorage.getItem('jwtToken');
    const headers = { 'Authorization': `Bearer ${token}` };

    const uploadApiUrl = 'http://localhost:8080/api/files/upload';

    return this.http.post<{message: string}>(uploadApiUrl, {}, { headers })
  }
}
