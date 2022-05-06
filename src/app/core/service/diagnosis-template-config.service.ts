import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DiagnosisTemplateConfig } from '../model/diagnosisTemplateConfig';
import { DoctorProfile } from '../model/doctorProfile';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisTemplateConfigService {
  private API = environment.API;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public findTemplate() {
    return this.http.get(`/innovaPacsApi/api/v1/diagnosisPdfConfiguration/user`, {'headers': this.authService.getHeader()});
  }

  public save(template: DiagnosisTemplateConfig) {
    return this.http.post(`/innovaPacsApi/api/v1/diagnosisPdfConfiguration`,
    template,
    {'headers': this.authService.getHeader()});
  }

  public update(template: DiagnosisTemplateConfig) {
    return this.http.put(`/innovaPacsApi/api/v1/diagnosisPdfConfiguration`,
    template,
    {'headers': this.authService.getHeader()});
  }
}
