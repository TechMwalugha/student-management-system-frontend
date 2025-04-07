import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly authCheckUrl = 'http://localhost:8080/api/auth/check'; // ✅ Fixed URL
  private readonly loginUrl = 'http://localhost:8080/api/auth/login'; // ✅ Fixed URL
  private readonly logoutUrl = 'http://localhost:8080/api/auth/logout'; // ✅ Fixed URL

  constructor(private http: HttpClient, private router: Router) {}

  //  Secure way to check if user is authenticated
  isAuthenticated(): Observable<boolean> {

    return this.http.get<{ authenticated: boolean, expired: false }>(this.authCheckUrl)
      .pipe(
        map(response => {
          return response.authenticated
        }),  // ✅ Returns true if authenticated
        catchError((error) => {
          if(error?.error?.description === 'The JWT token has expired') {
            // return this.refreshToken();
          }
          return of(false)
        }) // ✅ If error, assume user is NOT authenticated
      );


  }

  //  login method
  login(email: string, password: string): Observable<any> {
    return this.http.post<string>(this.loginUrl, { email, password });
  }

  logout() {

    this.http.post<{message: string}>(this.logoutUrl, {})
    .subscribe({
      next: (response) => {
        console.log(response)
        localStorage.removeItem('jwtToken'); // ✅ Remove token from local storage
        localStorage.removeItem('refreshToken'); // ✅ Remove token from local storage
        localStorage.removeItem('user'); // ✅ Remove user from local storage
        this.router.navigate(['/login']); // ✅ Redirect to login page
      }, 
      error: (error) => {
        console.error(error);
        return null
      }
    })
  }


  refreshToken(): Observable<{ newAccessToken: string, refreshToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) return throwError(() => new Error('No refresh token found'));
  
    return this.http.post<{ newAccessToken: string, refreshToken: string }>(
      'http://localhost:8080/api/auth/refresh-token', 
      {}, 
      { params: { refreshToken } }
    ).pipe(
      map(response => {
        return response; // ✅ Now returns full token object
      }),
      catchError(error => {
        console.error("Refresh token function: " + error);
        return throwError(() => new Error('Refresh token request failed'));
      })
    );
  }
  

  getJwtToken(): string | null { 
    return localStorage.getItem("jwtToken")
  }

}
