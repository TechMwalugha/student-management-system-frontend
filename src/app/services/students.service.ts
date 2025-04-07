import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { studentsType } from '../models/sidebar.todo';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private apiUrl = 'http://localhost:8080/api/students'; // Replace with your API URL

  
  constructor(private http: HttpClient) { 
    
  }


  getStudents() {
    return this.http.get<studentsType>(this.apiUrl);
  }

  getStudentsPage(
    page: number,
    size: number,
    filters?: { studentId?: number; studentClass?: string; startDate?: string; endDate?: string }
  ) {

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

    return this.http.get<studentsType>(this.apiUrl, { params });
  }

  softDeleteStudent(studentId: number)  {

   return this.http.delete<{message: string}>(`${this.apiUrl}/${studentId}`)

  }

  exportStudentReport(
    page: number,
    size: number,
    filters?: { studentId?: number; studentClass?: string; startDate?: string; endDate?: string }
  ): Observable<Blob> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
  
    if (filters) {
      if (filters.studentId) params = params.set('studentId', filters.studentId.toString());
      if (filters.studentClass) params = params.set('studentClass', filters.studentClass);
      if (filters.startDate) params = params.set('startDate', filters.startDate);
      if (filters.endDate) params = params.set('endDate', filters.endDate);
    }
  
    return this.http.get(`${this.apiUrl}/export`, {
      params,
      responseType: 'blob' // important for binary download
    });
  }

  updateStudent(id: string, formData: FormData) {
    return this.http.put<{ message: string }>(`http://localhost:8080/api/students/${id}`, formData);
  }
  
}
