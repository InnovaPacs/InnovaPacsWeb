import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/core/model/patient';
import { Study } from 'src/app/core/model/study';
import { PatientService } from 'src/app/core/service/patient.service';
import { StudyService } from 'src/app/core/service/study.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.sass']
})
export class StudyComponent implements OnInit {
  public studies: Study[] = [];
  public patient: Patient;

  constructor(private activatedRoute: ActivatedRoute,
    private studyService: StudyService,
    private patientService: PatientService) { }

  ngOnInit() {
    this.load();
  }

  async load() {
    this.activatedRoute.params.subscribe( async params => {
      const patientId = params.pk;
      
      if (patientId) {
          this.patient = await this.patientService.findById(patientId).toPromise() as Patient;
          this.studies = await this.studyService.findByPatientId(patientId)
          .toPromise() as Study[]; 
      }
    });
  }

  public viewStudy(studyIuid: string){
    if(studyIuid){
      window.open(`http://localhost/viewer.html?studyUID=${studyIuid}`, '_blank');
    }
  }
}
