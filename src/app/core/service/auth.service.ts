import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = environment.API;
  constructor(private http: HttpClient) { }

  public login(user: Login) {
    return this.http.post(`${this.API}/authenticate`, user);
  }

  handleSession(response): void {
    if (response.jwt) {
      sessionStorage.setItem('token', response.jwt);
    }
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  closeSession(): void {
    sessionStorage.clear();
  }
}
