import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private API = environment.API;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public sendStudy(studyUID: string): Observable<any> {
    return this.http.get<any>(`/innovaPacsApi/api/v1/notifications/${studyUID}`, {'headers': this.authService.getHeader()});
  }
}
