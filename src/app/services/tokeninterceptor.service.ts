import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor {

  constructor(public authService: AuthService) { }
  private isRefreshing = false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepting request...')

      if(this.authService.getJwtToken() && !request.url.includes('refresh-token')) {
        request = this.addToken(request, this.authService.getJwtToken()!);
      }

      return next.handle(request).pipe(catchError(error => {
        if(error instanceof HttpErrorResponse && error.status === 401 && error.error?.description === 'The JWT token has expired') {
          
          return this.handle401Error(request, next);
        } else {
          console.log('Error in interceptor')
          return throwError(error);
        }
      }))
  }

  private addToken(request: HttpRequest<any>, token: string) {

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    console.log("Entered handle error.")
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      
      return this.authService.refreshToken().pipe(
        
        switchMap((token: any) => {
          if (!token || !token.newAccessToken) {
            throw new Error('Invalid refresh token response');
          }
  
          // Save new token to localStorage
          localStorage.setItem('jwtToken', token.newAccessToken);
          localStorage.setItem('refreshToken', token.refreshToken);
  
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.newAccessToken);

          return next.handle(this.addToken(request, token.newAccessToken));
        }),
        catchError(err => {
          console.error('Token refresh failed', err);
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => new Error('Refresh Token Failed'));
        })
      );

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
  
}
