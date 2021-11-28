import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DiagnosisDto } from 'src/app/core/model/diagnosis';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { DiagnosisService } from 'src/app/core/service/diagnosis.service';
import { Util } from 'src/app/core/util/util';
import { InnovaFileService } from 'src/app/core/service/innova-file.service';
import { InnovaFile } from 'src/app/core/model/innovaFile';

@Component({
  selector: 'app-diagnosis-form',
  templateUrl: './diagnosis-form.component.html',
  styleUrls: ['./diagnosis-form.component.sass']
})
export class DiagnosisFormComponent implements OnInit {
  public diagnosis: DiagnosisDto = new DiagnosisDto();
  public title = 'Registrar diagnóstico';
  public diagnosisForm: FormGroup;
  public faPenSquare = faPenSquare;
  public submitted = false;
  public studyPk: number;
  public file: File = null;
  public custonDiagnosis: boolean = true;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private diagnosisService: DiagnosisService,
              private util: Util,
              private innovaFileService: InnovaFileService) { }

  ngOnInit(): void {
    this.load();
    this.initForm();
  }

    /**
   * Load data
   */
    async load() {
    this.activatedRoute.params.subscribe( async params => {
      const id = params.diagnosisId;
      this.studyPk = params.studyPk;

      if (id) {
        this.util.loading();
        this.diagnosis = await this.diagnosisService.findById(id).toPromise() as DiagnosisDto;
        
        if(this.diagnosis){
          this.diagnosisForm.patchValue(this.diagnosis);
          this.custonDiagnosis = this.diagnosis.custom;
          this.title = 'Editar usuario';
        }

        this.util.cancelLoading();
      }
    });
  }

  initForm() {
    this.diagnosisForm = this.formBuilder.group({
      id: [null],
      studyId: [this.studyPk],
      fileId: [null],
      title: [null, [ Validators.required ]],
      diagnosis: [null],
      custom: [null]
    });
  }

  async onSubmit() {
    this.submitted = true;

    if (this.diagnosisForm.invalid) {
      return;
    }

    if(this.custonDiagnosis && !this.file){
      this.util.errorMessage('Debe se selccionar un archivo antes de guardar');
      return;
    }

    this.diagnosis = this.diagnosisForm.value as DiagnosisDto;
    this.diagnosis.custom = this.custonDiagnosis;
    this.util.loading();
    
    this.saveDiagnosis();
  }

  public async saveDiagnosis(){
    try {

      if(this.diagnosis.custom){
        const innovaFile = await this.innovaFileService.create(this.file).toPromise() as InnovaFile;
        this.diagnosis.fileId = innovaFile.id;
      }

      if (this.diagnosis.id !== null) {
        const response = await this.diagnosisService.update(this.diagnosis).toPromise();
        this.util.successMessage('El diagnóstico se actulizo correctamente');
        this.studyPk = this.diagnosis.studyId;

      } else {
        const response = await this.diagnosisService.create(this.diagnosis).toPromise();
        this.util.successMessage('El diagnóstico se creo correctamente');
      }

      this.router.navigate([`/admin/diagnosis/study/${this.studyPk}`]);

    } catch (error) {
      this.util.handleError(error);
    }
  }

  get f() { return this.diagnosisForm.controls; }

  public uploadFile(event){
    this.file = event.target.files[0];
  }
}
