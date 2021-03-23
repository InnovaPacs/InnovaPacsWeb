import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private API = environment.API;
  constructor(private http: HttpClient) { }

  public findAll() {
    return this.http.get(`${this.API}/patients/`);
  }

  public findById(id: number) {
    return this.http.get(`${this.API}/patients/${id}`);
  }
}
