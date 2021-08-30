import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InstitutionUser } from '../model/institutionUser';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private API = environment.API;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public findAll() {
    return this.http.get(`${this.API}api/v1/institutions`, {'headers': this.authService.getHeader()});
  }

  public configuration(institutionUser: InstitutionUser) {
    return this.http.post(`${this.API}api/v1/institutions/configuration`, institutionUser, {'headers': this.authService.getHeader()});
  }

  public modalityReport(institutionId: number) {
    return this.http.get(`${this.API}api/v1/studies/institutions/${institutionId}/modalityReport`, {'headers': this.authService.getHeader()});
  }

  public institutionReport(institutionId: number) {
    return this.http.get(`${this.API}api/v1/studies/institutions/${institutionId}/report`, {'headers': this.authService.getHeader()});
  }

  public getById(institutionId: number) {
    return this.http.get(`${this.API}api/v1/institutions/${institutionId}`, {'headers': this.authService.getHeader()});
  }

  public generateReport(intitutionId: number) {
    return this.http.get(`${this.API}api/v1/institutions/report/${intitutionId}`, 
    {
      'headers': this.authService.getHeader(),
      responseType: 'blob'
    }).pipe(
      map((result: any) => {
        return result;
      }),
    );
  }
}
