import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DoctorProfile } from '../model/doctorProfile';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorProfileService {
  private API = environment.API;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public findDoctorProfile() {
    return this.http.get(`${this.API}api/v1/doctorProfile/user`, {'headers': this.authService.getHeader()});
  }

  public save(profile: DoctorProfile) {
    return this.http.post(`${this.API}api/v1/doctorProfile`, 
    profile,
    {'headers': this.authService.getHeader()});
  }

  public update(profile: DoctorProfile) {
    return this.http.put(`${this.API}api/v1/doctorProfile`, 
    profile,
    {'headers': this.authService.getHeader()});
  }
}
