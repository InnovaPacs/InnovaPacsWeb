import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DiagnosisDto } from '../model/diagnosis';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {
  private API = environment.API;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public findAllByStudyId(studyId: number) {
    return this.http.get(`${this.API}api/v1/diagnoses/study/${studyId}`, 
      {'headers': this.authService.getHeader()});
  }

  public findById(diagnosisId: number) {
    return this.http.get(`${this.API}api/v1/diagnoses/${diagnosisId}`, 
      {'headers': this.authService.getHeader()});
  }

  public update(diagnosisDto: DiagnosisDto) {
    return this.http.put(`${this.API}api/v1/diagnoses`, 
    diagnosisDto,
    {'headers': this.authService.getHeader()});
  }

  public create(diagnosisDto: DiagnosisDto) {
    return this.http.post(`${this.API}api/v1/diagnoses`, 
    diagnosisDto,
    {'headers': this.authService.getHeader()});
  }

  public deleteById(id: number) {
    return this.http.delete(`${this.API}api/v1/diagnoses/${id}`, {'headers': this.authService.getHeader()});
  }
}
