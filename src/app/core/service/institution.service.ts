import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InstitutionUser } from '../model/institutionUser';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private API = environment.API;
  constructor(private http: HttpClient) { }

  public findAll() {
    return this.http.get(`${this.API}/institutions/`);
  }

  public configuration(institutionUser: InstitutionUser) {
    return this.http.post(`${this.API}/institutions/configuration`, institutionUser);
  }
}
