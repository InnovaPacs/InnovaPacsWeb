import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/core/model/patient';
import { PatientService } from 'src/app/core/service/patient.service';
import { Util } from 'src/app/core/util/util';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass']
})
export class PatientComponent implements OnInit {
  public patients: Patient[] = [];
  public patientPk;

  constructor(private patientService: PatientService, private util: Util) { }

  ngOnInit() {
    this.load();
  }

  async load(){
    this.util.loading();

    this.patientService.findAll().subscribe(response => {
      this.patients = response;
      this.util.cancelLoading();
    }, (error) => this.util.handleError(error));

  }
}
