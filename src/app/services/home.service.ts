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
    return this.http.get<any[]>(this.getStudentsUrl)
  }
}
