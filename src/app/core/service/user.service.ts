import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API = environment.API;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public findAll() {
    return this.http.get(`/innovaPacsApi/api/v1/users/`, {'headers': this.authService.getHeader()});
  }

  public findById(id: number) {
    return this.http.get(`/innovaPacsApi/api/v1/users/${id}`, {'headers': this.authService.getHeader()});
  }

  public create(user: User) {
    return this.http.post(`/innovaPacsApi/api/v1/users/`, user, {'headers': this.authService.getHeader()});
  }

  public update(user: User, id: number) {
    return this.http.put(`/innovaPacsApi/api/v1/users/${id}`, user, {'headers': this.authService.getHeader()});
  }
}
