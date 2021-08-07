import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavComponent } from './components/nav/nav.component';
import { AdminRoutingModule } from '../admin/admin-routing.module';



@NgModule({
  declarations: [
    AlertComponent, MenuComponent, NavComponent
  ],
  imports: [
    CommonModule, AdminRoutingModule
  ],
  exports: [
    AlertComponent, MenuComponent, NavComponent
  ]
})
export class ShareModule { }
