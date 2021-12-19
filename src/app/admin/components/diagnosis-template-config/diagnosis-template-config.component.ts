import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiagnosisTemplateConfig } from 'src/app/core/model/diagnosisTemplateConfig';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { DiagnosisTemplateConfigService } from 'src/app/core/service/diagnosis-template-config.service';
import { Util } from 'src/app/core/util/util';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorProfile } from 'src/app/core/model/doctorProfile';
import { InnovaFileService } from 'src/app/core/service/innova-file.service';
import { InnovaFile } from 'src/app/core/model/innovaFile';

@Component({
  selector: 'app-diagnosis-template-config',
  templateUrl: './diagnosis-template-config.component.html',
  styleUrls: ['./diagnosis-template-config.component.sass']
})
export class DiagnosisTemplateConfigComponent implements OnInit {
  public diagnosisTemplateConfig: DiagnosisTemplateConfig = new DiagnosisTemplateConfig();
  public diagnosisTemplateConfigForm: FormGroup;
  public title = 'Configurar template';
  public submitted = false;
  public faPenSquare = faPenSquare;
  public logo: File;
  
  constructor(private diagnosisTemplateConfigService: DiagnosisTemplateConfigService, 
              public util: Util,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private innovaFileService: InnovaFileService ) { }

  ngOnInit(): void {
    this.load();
    this.initForm();
  }

  /**
   * Load data
   */
   async load() {

    try {
      this.util.loading();
      
      this.diagnosisTemplateConfig = await this.diagnosisTemplateConfigService.findTemplate().toPromise() as DiagnosisTemplateConfig;
    
      if(!this.diagnosisTemplateConfig){
        this.diagnosisTemplateConfig = new DiagnosisTemplateConfig();
      }else {
        this.diagnosisTemplateConfigForm.patchValue(this.diagnosisTemplateConfig);
      }

      this.util.cancelLoading();
    } catch (error) {
      this.util.handleError(error);
    }
   }

   initForm() {
    this.diagnosisTemplateConfigForm = this.formBuilder.group({
      id: [null],
      innovaFileId: [null],
      headerColor: [null, [ Validators.required ]],
      templateName: [null, [ Validators.required ]]
    });
  }

  async onSubmit() {
    this.submitted = true;
    if (this.diagnosisTemplateConfigForm.invalid) {
      return;
    }

    if(!this.logo){
      this.util.errorMessage('Es importnate seleccionar un logotipo.');
      return;
    }

    const innovaFile = await this.innovaFileService.create(this.logo).toPromise() as InnovaFile;

    this.diagnosisTemplateConfigForm.patchValue({ 'innovaFileId': innovaFile.id })
    this.diagnosisTemplateConfig = this.diagnosisTemplateConfigForm.value as DiagnosisTemplateConfig;
    
    try {

      if(!this.diagnosisTemplateConfig.id){    
        await this.diagnosisTemplateConfigService.save(this.diagnosisTemplateConfig).toPromise();
        this.util.successMessage('Su perfil se configuro correctamente');
      }else{
        await this.diagnosisTemplateConfigService.update(this.diagnosisTemplateConfig).toPromise();
        this.util.successMessage('Su perfil se actualizo correctamente');
      }
      
      this.router.navigate(['/admin/fullStudies']);
    } catch (error) {
      this.util.handleError(error);
    }
  }

  get f() { return this.diagnosisTemplateConfigForm.controls; }

  /**
   * save file
   */
  public saveFile(files: File[]){
    if(files){
      this.logo = files[0];
    }
  }
}
