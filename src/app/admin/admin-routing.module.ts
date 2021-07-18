import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullStudiesComponent } from './components/full-studies/full-studies.component';
import { InstitutionReportComponent } from './components/institution-report/institution-report.component';
import { InstitutionUserFormComponent } from './components/institution-user-form/institution-user-form.component';
import { InstitutionComponent } from './components/institution/institution.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PatientComponent } from './components/patient/patient.component';
import { StudyComponent } from './components/study/study.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'patients',
        component: PatientComponent,
      },
      {
        path: 'studies/:pk',
        component: StudyComponent,
      },
      {
        path: 'fullStudies',
        component: FullStudiesComponent,
      },
      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'users/form/:id',
        component: UserFormComponent,
      },
      {
        path: 'users/form',
        component: UserFormComponent,
      },
      {
        path: 'institutionUser/form/:userId',
        component: InstitutionUserFormComponent,
      },
      {
        path: 'institutions/:institutionId/report',
        component: InstitutionReportComponent,
      },
      {
        path: 'institutions',
        component: InstitutionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
