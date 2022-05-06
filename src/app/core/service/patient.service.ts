import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailConfiguration } from '../model/emailConfiguration';
import { Patient } from '../model/patient';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private API = environment.API;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public findAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`/innovaPacsApi/api/v1/patients/`, {'headers': this.authService.getHeader()});
  }

  public findById(id: number) {
    return this.http.get(`/innovaPacsApi/api/v1/patients/${id}`, {'headers': this.authService.getHeader()});
  }

  public configureEmail(emailConfiguration: EmailConfiguration) {
    return this.http.put(`/innovaPacsApi/api/v1/patients/`, emailConfiguration, {'headers': this.authService.getHeader()});
  }
}
