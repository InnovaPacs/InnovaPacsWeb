import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PatientComponent } from './components/patient/patient.component';
import { StudyComponent } from './components/study/study.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavComponent } from './components/nav/nav.component';
import { FullStudiesComponent } from './components/full-studies/full-studies.component';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InstitutionUserFormComponent } from './components/institution-user-form/institution-user-form.component';
import { ConfigureEmailComponent } from './components/configure-email/configure-email.component';
import { FontAwesomeModule }from '@fortawesome/angular-fontawesome';
import { ShareStudyComponent } from './components/share-study/share-study.component';

@NgModule({
  declarations: [PatientComponent, StudyComponent, LayoutComponent, FooterComponent, NavComponent, MenuComponent, FullStudiesComponent, UserComponent, UserFormComponent, InstitutionUserFormComponent, ConfigureEmailComponent, ShareStudyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    FontAwesomeModule
  ]
})
export class AdminModule { }
