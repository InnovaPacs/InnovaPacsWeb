import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InstitutionUser } from '../model/institutionUser';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AttrsService {
  private API = environment.API;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public findAllModalities() {
    return this.http.get(`/innovaPacsApi/api/v1/attrs/modalities`, {'headers': this.authService.getHeader()});
  }
}
