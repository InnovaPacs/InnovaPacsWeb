import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { compareAsc } from 'date-fns/fp';
import { FullStudy } from 'src/app/core/model/fullStudy';
import { StudyFilter } from 'src/app/core/model/StudyFilter';
import { Institution } from 'src/app/core/model/institution';
import { Modality } from 'src/app/core/model/modality';
import { AttrsService } from 'src/app/core/service/attrs.service';
import { InstitutionService } from 'src/app/core/service/institution.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { StudyService } from 'src/app/core/service/study.service';
import { Util } from 'src/app/core/util/util';
import Swal from 'sweetalert2';
import { faFilter, faPowerOff, faSearch, faTrashAlt, faTasks, faEye, faCogs, faShareAlt, faShareSquare, faEnvelope } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-full-studies',
  templateUrl: './full-studies.component.html',
  styleUrls: ['./full-studies.component.sass']
})
export class FullStudiesComponent implements OnInit {
  public faFilter = faFilter;
  public faPowerOff = faPowerOff;
  public faSearch = faSearch;
  public faTrash = faTrashAlt;
  public faTasks = faTasks;
  public faEye = faEye;
  public faCogs = faCogs;
  public faShareAlt = faShareAlt;
  public faShareSquare = faShareSquare;
  public faEnvelope = faEnvelope;

  public showFilter = false;
  public studies: FullStudy[] = [];
  public studiesAux: FullStudy[] = [];
  public searchInput = new FormControl('');
  public filterForm: FormGroup;
  public institutions: Institution[] = [];
  public modalities: Modality[] = [];
  public patientPk;
  public uuid: string;
  
  public alertShow = false;
  public alertMessage = 'No hay estudios relacionados con la busqueda';
  public alertType = 'warning';

  constructor(private studyService: StudyService,
    private institutionService: InstitutionService,
    private attrsService: AttrsService,
    public util: Util,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService ) { }

  ngOnInit() {
    this.load();
    this.initList();
    this.initForm();

  }

  public load() {
    this.util.loading();
    this.studyService.findFullStudies().subscribe(response => {
      this.studies = response;
      this.alertShow = this.studies.length === 0; 
      this.util.cancelLoading();

    }, (error) => this.util.handleError(error));
  }

  private async initList(){
    this.institutions = await this.institutionService.findAll().toPromise() as Institution[];
    this.modalities = await this.attrsService.findAllModalities().toPromise() as Modality[];
  }

  public viewStudy(studyIuid: string){
    if(studyIuid){
      window.open(`http://192.168.0.7/viewer.html?studyUID=${studyIuid}`, '_blank');
    }
  }

  initForm() {
    this.filterForm = this.formBuilder.group({
      name: [null],
      institution: [null],
      patientId: [null],
      gender: [null],
      studyDescription: [null],
      modality: [null],
      instances: [null],
      studyDateInit: [null],
      studyDateEnd: [null]
    });
  }

  public async filter(){
    const filter = this.filterForm.value as StudyFilter;
    this.studies = await this.studyService.findFullStudiesWithFilter(filter).toPromise();
    this.alertShow = this.studies.length === 0;
  }

  public validateDate(option: number){
    let studyDateInit;
    let studyDateEnd;
    
    if(option === 0){
      studyDateInit = this.filterForm.controls['studyDateInit'].value;
      studyDateEnd = this.filterForm.controls['studyDateEnd'].value; 
    }

    
    if(studyDateInit && studyDateEnd){
      const init = studyDateInit.split('-') as number[];
      const end = studyDateEnd.split('-') as number[];
      const result = compareAsc(new Date(init[0], init[1], init[2]), new Date(end[0], end[1], end[2]));
      if(result < 0){
        this.util.errorMessage('La fecha inicio no debe ser menor a fecha fin.');
        this.filterForm.patchValue({'studyDateEnd': null});
      }
    }
  }

  public sendNotification(iuid: string){
    Swal.fire({
      title: '¿Esta seguro de enviar correo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, enviar!',
      cancelButtonText: 'Cancelar',
    }).then( async (result) => {
      if (result.isConfirmed) {
        this.notificationService.sendStudy(iuid).subscribe(() => {
          Swal.fire(
            'Estudio enviado!',
            'El estudio se envio correctamente.',
            'success'
          );
        });
      }
    })
  }
}

