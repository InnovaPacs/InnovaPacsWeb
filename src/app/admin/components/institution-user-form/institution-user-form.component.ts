import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Institution } from 'src/app/core/model/institution';
import { InstitutionConfiguration } from 'src/app/core/model/InstitutionConfigurationDto';
import { InstitutionUser } from 'src/app/core/model/institutionUser';
import { User } from 'src/app/core/model/user';
import { InstitutionService } from 'src/app/core/service/institution.service';
import { UserService } from 'src/app/core/service/user.service';
import { Util } from 'src/app/core/util/util';

@Component({
  selector: 'app-institution-user-form',
  templateUrl: './institution-user-form.component.html',
  styleUrls: ['./institution-user-form.component.sass']
})
export class InstitutionUserFormComponent implements OnInit {
  public user = new User();
  public institutions: InstitutionConfiguration[] = [];
  public institutionUser: InstitutionUser = new InstitutionUser();
  public submitted = false;
  public title = 'Registrar usuario';
  public institutionUserForm: FormGroup;
  public userId: number;
  
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private institutionService: InstitutionService,
              private util: Util) { }

  ngOnInit() {
    this.load();
    this.loadList();
    this.initForm();
  }

  /**
   * Load data
   */
  async load() {

    this.activatedRoute.params.subscribe( async params => {
      this.userId = params.userId;
        
      if (this.userId) {
        this.user = await this.userService.findById(this.userId).toPromise() as User;
        this.institutionUserForm.patchValue({userId: this.user.id});
      }
    });
  }

  /**
   * Load all lists
   */
  async loadList(){

    try {
      this.util.loading();

      this.institutions = await this.institutionService.findConfigurationByUserId(this.userId)
      .toPromise() as InstitutionConfiguration[];

      this.util.cancelLoading();
    } catch (error) {
      this.util.handleError(error);
    }
  }

  public async onSubmit(){
    try {

      this.institutionUser = this.institutionUserForm.value as InstitutionUser;
      await this.institutionService.configuration(this.institutionUser).toPromise();
      this.router.navigate(['/admin/users']);  

    } catch (error) {
      this.util.handleError(error);
    }
  }

  initForm() {
    this.institutionUserForm = this.formBuilder.group({
      id: [null],
      userId: [null, [ Validators.required ]],
      institutionId: [null, [ Validators.required ]]
    });
  }

  get f() { return this.institutionUserForm.controls; }

  /**
   * Save all configuration
   */
  public async saveConfiguration(){
    try {
      this.util.loading();
      const ids = this.institutions.map(inst => {
        if(inst.active){
          return inst.id;
        }
      });
  
      const response = await this.institutionService.saveConfigurationByUserId(this.userId, ids)
      .toPromise() as InstitutionConfiguration[];
  
      this.institutions = response;
      this.router.navigate(['/admin/users']);  
      
      this.util.cancelLoading();
    } catch (error) {
      this.util.handleError(error);
    }
    
  }

  onChange(event:any, id: number){

    for(let inst of this.institutions){
      if(inst.id === id){
        inst.active = event;
      }
    }
  }
}
