import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Institution } from 'src/app/core/model/institution';
import { InstitutionUser } from 'src/app/core/model/institutionUser';
import { User } from 'src/app/core/model/user';
import { InstitutionService } from 'src/app/core/service/institution.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-institution-user-form',
  templateUrl: './institution-user-form.component.html',
  styleUrls: ['./institution-user-form.component.sass']
})
export class InstitutionUserFormComponent implements OnInit {
  public user = new User();
  public institutions: Institution[] = [];
  public institutionUser: InstitutionUser = new InstitutionUser();

  public title = 'Registrar usuario';
  public institutionUserForm: FormGroup;
  
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private institutionService: InstitutionService) { }

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
      const id = params.userId;
        
      if (id) {
        this.user = await this.userService.findById(id).toPromise() as User;
        this.institutionUserForm.patchValue({userId: this.user.id});
      }
    });
  }

  /**
   * Load all lists
   */
  async loadList(){

    this.institutions = await this.institutionService.findAll().toPromise() as Institution[];

  }

  public async onSubmit(){
    this.institutionUser = this.institutionUserForm.value as InstitutionUser;
    await this.institutionService.configuration(this.institutionUser).toPromise();
    this.router.navigate(['/admin/users']);
  }

  initForm() {
    this.institutionUserForm = this.formBuilder.group({
      id: [null],
      userId: [null, [ Validators.required ]],
      institutionId: [null, [ Validators.required ]]
    });
  }

  get f() { return this.institutionUserForm.controls; }
}
