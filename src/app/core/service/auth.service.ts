import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../model/login';
import { OAuth } from '../model/oauth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = environment.API;
  constructor(private http: HttpClient) { }

  public login(user: Login): Observable<OAuth> {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET}`)}`
    });

    const params = new URLSearchParams();
    params.set('username', user.username);
    params.set('password', user.password);
    params.set('grant_type', environment.GRANT_TYPE);

    return this.http.post<OAuth>(`${this.API}oauth/token`, params.toString(), { headers });
  }

  handleSession(response): void {
    if (response['access_token']) {
      localStorage.setItem('access_token', response['access_token']);
    }
  }

  validateSession(response): void {
    if (response['access_token']) {
      localStorage.setItem('access_token', response['access_token']);
    }
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  /**
   * Clear session storage
   */
  closeSession(): void {
    localStorage.clear();
  }

  /**
   * Get authorization header
   * @returns 
   */
  getHeader(): HttpHeaders{
    const header = new HttpHeaders();
    return header.append('Authorization',`Bearer ${this.getToken()}`);
  }
}
