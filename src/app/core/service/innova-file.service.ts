import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InnovaFileService {
  private API = environment.API;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public create(file: File) {
    var formData = new FormData();
    formData.append('file', file);

    return this.http.post(`/innovaPacsApi/api/v1/innovaFiles`,
      formData,
      {'headers': this.authService.getHeader()});
  }

  getFileByteArray(fileId: number) {
    return this.http
      .get(`/innovaPacsApi/api/v1/innovaFiles/${fileId}/download`,
      {
        'headers': this.authService.getHeader(),
        'responseType': 'blob'
      })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }
}
