import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { studentsType } from '../models/sidebar.todo';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private apiUrl = 'http://localhost:8080/api/students'; // Replace with your API URL

  
  constructor(private http: HttpClient) { 
    
  }


  getStudents() {
    const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get<studentsType>(this.apiUrl, { headers });
  }

  getStudentsPage(
    page: number,
    size: number,
    filters?: { studentId?: number; studentClass?: string; startDate?: string; endDate?: string }
  ) {
    const token = localStorage.getItem('jwtToken');
    const headers = { 'Authorization': `Bearer ${token}` };

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // Optionally add filtering parameters if provided
    if (filters) {
      if (filters.studentId) {
        params = params.set('studentId', filters.studentId.toString());
      }
      if (filters.studentClass) {
        params = params.set('studentClass', filters.studentClass);
      }
      if (filters.startDate) {
        params = params.set('startDate', filters.startDate); // Expected format: "yyyy-MM-dd"
      }
      if (filters.endDate) {
        params = params.set('endDate', filters.endDate); // Expected format: "yyyy-MM-dd"
      }
    }

    return this.http.get<studentsType>(this.apiUrl, { headers, params });
  }
}
