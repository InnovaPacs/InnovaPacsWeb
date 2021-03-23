import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/core/model/patient';
import { PatientService } from 'src/app/core/service/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass']
})
export class PatientComponent implements OnInit {
  public patients: Patient[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.load();
  }

  async load(){
    this.patients = await this.patientService.findAll().toPromise() as Patient[];
    console.log(this.patients);
  }
}
