import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PatientComponent } from './components/patient/patient.component';
import { StudyComponent } from './components/study/study.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavComponent } from './components/nav/nav.component';


@NgModule({
  declarations: [PatientComponent, StudyComponent, LayoutComponent, FooterComponent, NavComponent, MenuComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
