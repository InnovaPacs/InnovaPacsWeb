import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailConfiguration } from 'src/app/core/model/emailConfiguration';
import { PatientService } from 'src/app/core/service/patient.service';
import { Util } from 'src/app/core/util/util';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-configure-email',
  templateUrl: './configure-email.component.html',
  styleUrls: ['./configure-email.component.sass']
})
export class ConfigureEmailComponent implements OnInit {
  public faSave = faSave;
  public faTimes = faTimes;
  
  @ViewChild('btnCloseModal', null)
  private btnCloseModal: ElementRef;
  @Output()
  private refreshEvent = new EventEmitter();

  @Input() 
  private patientPk: number;
  private emailConfigurationForm: FormGroup;
  private submitted = false;
  
  constructor(private formBuilder: FormBuilder, private patientService: PatientService, private util: Util) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.emailConfigurationForm = this.formBuilder.group({
      patientPk: [this.patientPk],
      email: [null, [ Validators.required ]]
    });
  }

  private onSubmit(){
    this.util.loading();

    this.submitted = true;
    if (this.emailConfigurationForm.invalid) {
      return;
    }

    this.emailConfigurationForm.patchValue({ 'patientPk': this.patientPk });
    const form = this.emailConfigurationForm.value as EmailConfiguration;
    this.patientService.configureEmail(form).subscribe(result => {
      this.btnCloseModal.nativeElement.click();
      this.util.successMessage('La configuracón de email se realizó con exito.');
      this.refreshEvent.emit();
    }, 
    (error) => this.util.handleError(error));
  }

  get f() { return this.emailConfigurationForm.controls; }
}
