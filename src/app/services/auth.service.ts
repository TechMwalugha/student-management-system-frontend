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

  //  Secure way to check if user is authenticated
  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('jwtToken'); // ✅ Get token from local storage
    const headers = { 'Authorization': `Bearer ${token}` }; // ✅ Set authorization header

    console.log(token)

    if (!token) {
      return of(false); // ✅ If no token, user is NOT authenticated
    }

    return this.http.get<{ authenticated: boolean, expired: false }>(this.authCheckUrl, { headers })
      .pipe(
        map(response => response.authenticated),  // ✅ Returns true if authenticated
        catchError((error) => {
          console.log(error)
          return of(false)
        }) // ✅ If error, assume user is NOT authenticated
      );
  }

  //  login method
  login(email: string, password: string): Observable<any> {
    return this.http.post<string>(this.loginUrl, { email, password });
  }

  logout() {
    const token = localStorage.getItem('jwtToken'); // ✅ Get token from local storage
    const headers = { 'Authorization': `Bearer ${token}` }; // ✅ Set authorization header
    this.http.post<{message: string}>(this.logoutUrl, {}, {headers})
    .subscribe({
      next: (response) => {
        console.log(response.message)
        // localStorage.removeItem('jwtToken'); // ✅ Remove token from local storage
        // localStorage.removeItem('user'); // ✅ Remove user from local storage
        this.router.navigate(['/login']); // ✅ Redirect to login page
      }, 
      error: (error) => {
        console.error(error);
      }
    })
  }

}
