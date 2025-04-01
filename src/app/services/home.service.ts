import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  getStudentsUrl =  'http://localhost:8080/api/students';
  constructor(private http: HttpClient) { }

  getStudents() {
     const token = localStorage.getItem('jwtToken'); // ✅ Get token from local storage
     const headers = { 'Authorization': `Bearer ${token}` }; 

    return this.http.get<{ content: any[] }>(this.getStudentsUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching students:', error);
        return of({ content: [] }); // ✅ Return an empty content array if API call fails
      })
    );
  }
}
