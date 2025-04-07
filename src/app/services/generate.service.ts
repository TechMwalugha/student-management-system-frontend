import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerateService {

  constructor(private http: HttpClient) { }

  private generateStudentsUrl = 'http://localhost:8080/api/files/generate/'

  generateStudents(count: number): Observable<{ message: string; file: string; }> {

    return this.http.post<{ message: string; file: string;}>(this.generateStudentsUrl + count, {});
    
  }
}
