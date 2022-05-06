import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FullStudy, FullStudyCount } from '../model/fullStudy';
import { StudyFilter } from '../model/StudyFilter';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private API = environment.API;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public findByPatientId(id: number) {
    return this.http.get(`/innovaPacsApi/api/v1/studies/patients/${id}`, {'headers': this.authService.getHeader()});
  }

  public findFullStudies(): Observable<FullStudy[]> {
    return this.http.get<FullStudy[]>(`/innovaPacsApi/api/v1/studies/full`, {'headers': this.authService.getHeader()});
  }

  public findFullStudiesCount(): Observable<FullStudyCount> {
    return this.http.get<FullStudyCount>(`/innovaPacsApi/api/v1/studies/fullCount`, {'headers': this.authService.getHeader()});
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

    return this.http.get<FullStudy[]>(`/innovaPacsApi/api/v1/studies/filter`, {'headers': this.authService.getHeader(), params: params });
  }

  public findFullStudiesCountWithFilter(filter: StudyFilter): Observable<FullStudyCount> {
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

    return this.http.get<FullStudyCount>(`/innovaPacsApi/api/v1/studies/filterCount`, {'headers': this.authService.getHeader(), params: params });
  }
}
