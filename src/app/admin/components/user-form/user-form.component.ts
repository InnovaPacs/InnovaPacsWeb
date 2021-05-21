import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/service/user.service';
import { Util } from 'src/app/core/util/util';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent implements OnInit {
  public user = new User();
  public title = 'Registrar usuario';
  public userForm: FormGroup;
  public submitted = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private util: Util){ }

  ngOnInit() {
    this.load();
    this.initForm();
  }

  /**
   * Load data
   */
  async load() {
    this.activatedRoute.params.subscribe( async params => {
      const id = params.id;
      if (id) {
        this.util.loading();
        this.user = await this.userService.findById(id).toPromise() as User;
        
        if(this.user){
          this.userForm.patchValue(this.user);
          this.title = 'Editar usuario';
        }

        this.util.cancelLoading();
      }
    });
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      id: [null],
      active: [true, [ Validators.required ]],
      email: [null, [ Validators.required ]],
      password: [null],
      username: [null, [ Validators.required ]]
    });
  }

  async onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    this.user = this.userForm.value as User;
    this.util.loading();
    
    try {
      if (this.user.id !== null) {
        const response = await this.userService.update(this.user, this.user.id).toPromise();
        this.util.successMessage('El usuario se creo correctamente');
      } else {
        const response = await this.userService.create(this.user).toPromise();
        this.util.successMessage('El usuario se actualizo correctamente');
      }
      this.router.navigate(['/admin/users']);
    } catch (error) {
      this.util.handleError(error);
    }
  }

  get f() { return this.userForm.controls; }

}
