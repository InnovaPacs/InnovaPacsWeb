import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/core/model/patient';
import { PatientService } from 'src/app/core/service/patient.service';
import { Util } from 'src/app/core/util/util';
import { faTasks, faBook, faCogs } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass']
})
export class PatientComponent implements OnInit {
  public patients: Patient[] = [];
  public patientsAux: Patient[] = [];
  public searchInput = new FormControl('');
  
  public patientPk;
  public faTasks = faTasks;
  public faBook = faBook;
  public faCogs = faCogs;

  public alertShow = false;
  public alertMessage = 'No hay pacientes relacionados con la busqueda';
  public alertType = 'warning';

  constructor(private patientService: PatientService, private util: Util) { }

  ngOnInit() {
    this.load();
  }

  async load(){
    this.util.loading();
    this.patientService.findAll().subscribe(response => {
      this.patients = response;
      this.patientsAux = response;
      this.alertShow = this.patientsAux.length === 0;
      this.util.cancelLoading();
    }, (error) => this.util.handleError(error));
  }

  /**
  * Search in the array
  */
  public search(){
    this.patientsAux = this.util.filterArrWithString(this.patients, this.searchInput.value);
    this.alertShow = this.patientsAux.length === 0;
  }
}
