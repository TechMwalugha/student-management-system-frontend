import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  private processApiUrl = 'http://localhost:8080/api/files/process'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  saveAsCSV() {
    const token = localStorage.getItem('jwtToken');
  
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<{message: string}>(this.processApiUrl, {}, { headers })
  }
}
