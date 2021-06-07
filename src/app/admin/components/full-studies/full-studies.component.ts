import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { compareDesc } from 'date-fns';
import { compareAsc } from 'date-fns/fp';
import { FullStudy } from 'src/app/core/model/fullStudy';
import { StudyFilter } from 'src/app/core/model/fullStudy copy';
import { Institution } from 'src/app/core/model/institution';
import { Modality } from 'src/app/core/model/modality';
import { AttrsService } from 'src/app/core/service/attrs.service';
import { InstitutionService } from 'src/app/core/service/institution.service';
import { StudyService } from 'src/app/core/service/study.service';
import { Util } from 'src/app/core/util/util';

@Component({
  selector: 'app-full-studies',
  templateUrl: './full-studies.component.html',
  styleUrls: ['./full-studies.component.sass']
})
export class FullStudiesComponent implements OnInit {
  public showFilter: false;
  private studies: FullStudy[] = [];
  public studiesAux: FullStudy[] = [];
  public searchInput = new FormControl('');
  public filterForm: FormGroup;
  public institutions: Institution[] = [];
  public modalities: Modality[] = [];
  
  constructor(private studyService: StudyService,
    private institutionService: InstitutionService,
    private attrsService: AttrsService,
    public util: Util,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.load();
    this.initList();
    this.initForm();

  }

  private load() {
    this.util.loading();
    this.studyService.findFullStudies().subscribe(response => {
      this.studies = response;
      this.studiesAux = [... this.studies] ;
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

  /**
  * Search in the array
  */
  public search(){
    this.studiesAux = this.util.filterArrWithString(this.studies, this.searchInput.value);
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
    this.studiesAux = [... this.studies] ;

    console.log('result: ',this.studies);
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
}

