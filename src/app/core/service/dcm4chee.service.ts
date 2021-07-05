import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OAuth } from '../model/oauth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class Dcm4cheeService {
  private API = environment.API;
  constructor(private http: HttpClient, private authService: AuthService) { }
  
  public findAllAet() {
    return this.http.get(`${this.API}api/v1/dcm4Chee/aets`, {'headers': this.authService.getHeader()});
  }

  public export(uuid: string, aets: string) {
    return this.http.post(`${this.API}api/v1/dcm4Chee/export`,{
      uuid: uuid,
      aets: aets
    }, {'headers': this.authService.getHeader()});
  }
}
