import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  getStudentsUrl =  `${environment.apiUrl}/students/student-count`;
  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get<any>(this.getStudentsUrl)
  }
}
