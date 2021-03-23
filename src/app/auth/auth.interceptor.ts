import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../core/service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}
  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status && error.status === 403) {
      this.router.navigateByUrl(`/`);
    }
    return throwError(error);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    swal.showLoading();
    request = this.addToken(request);
    return next.handle(request).pipe(catchError( error => this.handleAuthError(error))).pipe(finalize(() => swal.close()));
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return req;
    }
    return req;
  }
}
