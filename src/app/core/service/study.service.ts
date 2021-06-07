import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FullStudy } from '../model/fullStudy';
import { StudyFilter } from '../model/fullStudy copy';
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

  public findFullStudiesWithFilter(filter: StudyFilter): Observable<FullStudy[]> {
    let params = new HttpParams()
    .set('institution', filter.institution)
    .set('studyDescription', filter.studyDescription)
    .set('name', filter.name)
    .set('gender',filter.gender)
    .set('instances',filter.instances !== null ? filter.instances.toString() : '0')
    .set('modality',filter.modality)
    .set('patientId',filter.patientId)
    .set('studyDateEnd',filter.studyDateEnd !== null ? filter.studyDateEnd.toString() : null)
    .set('studyDateInit',filter.studyDateInit !== null ? filter.studyDateInit.toString() : null );

    console.log(params);
    
    return this.http.get<FullStudy[]>(`${this.API}api/v1/studies/filter`, {'headers': this.authService.getHeader(), params: params });
  }
}
