import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullStudiesComponent } from './components/full-studies/full-studies.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PatientComponent } from './components/patient/patient.component';
import { StudyComponent } from './components/study/study.component';
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
