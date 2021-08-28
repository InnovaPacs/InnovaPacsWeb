import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/model/login';
import { AuthService } from 'src/app/core/service/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public userForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      username: ['bautistaj', Validators.required],
      password: ['bautistaj20', Validators.required]
    });
  }

  login(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value as Login;
      
      this.authService.login(user).subscribe(response=> {
    
        this.authService.handleSession(response);
        this.router.navigate(['/admin/patients']);

      }, this.handleError);

    } else {
      this.userForm.markAllAsTouched();
    }
  }

  handleError(error): void {
    swal.fire('¡Oops!', '¡Ocurrio un error, intente más tarde por favor!', 'error');
  }

  isValidField(field: string): boolean {
    return this.userForm.get(field).touched && this.userForm.get(field).valid;
  }
}
