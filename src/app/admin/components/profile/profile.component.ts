import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorProfile } from 'src/app/core/model/doctorProfile';
import { DoctorProfileService } from 'src/app/core/service/doctor-profile.service';
import { Util } from 'src/app/core/util/util';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  public doctorProfile: DoctorProfile = new DoctorProfile();
  public doctorProfileForm: FormGroup;
  public title = 'Configurar perfil';
  public submitted = false;
  public faPenSquare = faPenSquare;
  
  constructor(private doctorProfileService: DoctorProfileService, 
              public util: Util,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,) { }

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
      
      this.doctorProfile = await this.doctorProfileService.findDoctorProfile().toPromise() as DoctorProfile;
      console.log(this.doctorProfile);

      if(!this.doctorProfile){
        this.doctorProfile = new DoctorProfile();
      }else {
        
        
        this.doctorProfileForm.patchValue(this.doctorProfile);
      }

      this.util.cancelLoading();
    } catch (error) {
      this.util.handleError(error);
    }
   }

   initForm() {
    this.doctorProfileForm = this.formBuilder.group({
      id: [null],
      name: [null, [ Validators.required ]],
      lastName: [null, [ Validators.required ]],
      title: [null],
      license: [null, [ Validators.required ]],
      college: [null, [ Validators.required ]]
    });
  }

  async onSubmit() {
    this.submitted = true;
    if (this.doctorProfileForm.invalid) {
      return;
    }

    this.doctorProfile = this.doctorProfileForm.value as DoctorProfile;
    
    try {

      console.log(this.doctorProfile);
      
      if(!this.doctorProfile.id){
        console.log('Create');
        
        await this.doctorProfileService.save(this.doctorProfile).toPromise();
        this.util.successMessage('Su perfil se configuro correctamente');
      }else{
        console.log('Update');
        await this.doctorProfileService.update(this.doctorProfile).toPromise();
        this.util.successMessage('Su perfil se actualizo correctamente');
      }
      
      this.router.navigate(['/admin/fullStudies']);
    } catch (error) {
      this.util.handleError(error);
    }
  }

  get f() { return this.doctorProfileForm.controls; }
}
