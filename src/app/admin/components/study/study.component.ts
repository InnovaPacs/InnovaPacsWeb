import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/core/model/patient';
import { Study } from 'src/app/core/model/study';
import { PatientService } from 'src/app/core/service/patient.service';
import { StudyService } from 'src/app/core/service/study.service';
import { Util } from 'src/app/core/util/util';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.sass']
})
export class StudyComponent implements OnInit {
  public studies: Study[] = [];
  public patient: Patient;
  public faEye = faEye;
  
  public alertShow = false;
  public alertMessage = 'No hay usuarios relacionados con la busqueda';
  public alertType = 'warning';

  constructor(private activatedRoute: ActivatedRoute,
    private studyService: StudyService,
    private patientService: PatientService,
    public util: Util) { }

  ngOnInit() {
    this.load();
  }

  async load() {
    this.util.loading();
    this.activatedRoute.params.subscribe( async params => {
      const patientId = params.pk;
      
      if (patientId) {

        try {
          this.patient = await this.patientService.findById(patientId).toPromise() as Patient;
          this.studies = await this.studyService.findByPatientId(patientId)
          .toPromise() as Study[]; 
          this.alertShow = this.studies.length === 0;
          this.util.cancelLoading();
        } catch (error) {
          this.util.handleError(error);
        } 
      }
    });
  }

  public viewStudy(studyIuid: string){
    if(studyIuid){
      window.open(`http://192.168.3.116:8080/weasis-pacs-connector/weasis?studyUID=${studyIuid}&cdb`, '_blank');
    }
  }
}
