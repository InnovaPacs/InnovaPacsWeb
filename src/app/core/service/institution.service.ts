import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InstitutionUser } from '../model/institutionUser';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private API = environment.API;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public findAll() {
    return this.http.get(`${this.API}api/v1/institutions/`, {'headers': this.authService.getHeader()});
  }

  public configuration(institutionUser: InstitutionUser) {
    return this.http.post(`${this.API}api/v1/institutions/configuration`, institutionUser, {'headers': this.authService.getHeader()});
  }
}
