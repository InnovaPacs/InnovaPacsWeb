import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API = environment.API;
  constructor(private http: HttpClient) { }

  public findAll() {
    return this.http.get(`${this.API}/users/`);
  }

  public findById(id: number) {
    return this.http.get(`${this.API}/users/${id}`);
  }

  public create(user: User) {
    return this.http.post(`${this.API}/users/`, user);
  }

  public update(user: User, id: number) {
    console.log('user: ',user);
    
    return this.http.put(`${this.API}/users/${id}`, user);
  }
}
