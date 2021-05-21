import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FullStudy } from '../model/fullStudy';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private API = environment.API;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public findByPatientId(id: number) {
    return this.http.get(`${this.API}api/v1/studies/patients/${id}`, {'headers': this.authService.getHeader()});
  }

  public findFullStudies(): Observable<FullStudy[]> {
    return this.http.get<FullStudy[]>(`${this.API}api/v1/studies/full`, {'headers': this.authService.getHeader()});
  }
}
