import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  getStudentsUrl =  'http://localhost:8080/api/students/all';
  constructor(private http: HttpClient) { }

  getStudents() {
     const token = localStorage.getItem('jwtToken'); // ✅ Get token from local storage
     const headers = { 'Authorization': `Bearer ${token}` }; 

    return this.http.get<any[]>(this.getStudentsUrl, { headers })
  }
}
