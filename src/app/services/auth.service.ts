import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private authCheckUrl = 'http://localhost:8080/api/auth/check'; // ✅ Fixed URL
  private loginUrl = 'http://localhost:8080/api/auth/login'; // ✅ Fixed URL
  private logoutUrl = 'http://localhost:8080/api/auth/logout'; // ✅ Fixed URL

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ Secure way to check if user is authenticated
  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ authenticated: boolean }>(this.authCheckUrl, { withCredentials: true })
      .pipe(
        map(response => response.authenticated),  // ✅ Returns true if authenticated
        catchError(() => of(false)) // ✅ If error, assume user is NOT authenticated
      );
  }

  //  login method
  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(this.loginUrl, { email, password }, { withCredentials: true });
  }

  logout() {
    this.http.post(this.logoutUrl, {}, { withCredentials: true }).subscribe({
      next: () => {
        console.log('Logged out successfully');
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (error) => {
        console.error('Logout failed:', error);
      },
    });
  }

}
