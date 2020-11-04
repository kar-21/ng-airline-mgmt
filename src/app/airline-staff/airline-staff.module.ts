import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AirlineStaffRoutingModule } from './airline-staff-routing.module';
import { AirlineStaffComponent } from './airline-staff.component';


@NgModule({
  declarations: [AirlineStaffComponent],
  imports: [
    CommonModule,
    AirlineStaffRoutingModule
  ]
})
export class AirlineStaffModule { }
