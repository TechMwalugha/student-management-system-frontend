import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerateService {

  constructor(private http: HttpClient) { }

  private generateStudentsUrl = `${environment.apiUrl}/files/generate/`

  generateStudents(count: number): Observable<{ message: string; file: string; }> {

    return this.http.post<{ message: string; file: string;}>(this.generateStudentsUrl + count, {});
    
  }
}
