import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private API = environment.API;
  constructor(private http: HttpClient) { }

  public findByPatientId(id: number) {
    return this.http.get(`${this.API}/studies/patients/${id}`);
  }
}
