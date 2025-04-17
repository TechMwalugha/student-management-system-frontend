import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNotifications() {
    return this.http.get<any>(`${environment.apiUrl}/notifications`);
  }

  deleteNotification(id: string): Observable<String> {
    return this.http.delete<String>(`${environment.apiUrl}/notifications/${id}`);
  }

  createNotification(notification: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/notifications/create`, notification);
  }

  updateNotification(notification: { notificationId: number; message: string}): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/notifications`, notification);
  }
}
