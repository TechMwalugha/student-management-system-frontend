import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  private processApiUrl = `${environment.apiUrl}/files/process`; // Replace with your API URL

  constructor(private http: HttpClient) { }

  saveAsCSV() {
    return this.http.post<{message: string}>(this.processApiUrl, {})
  }
}
