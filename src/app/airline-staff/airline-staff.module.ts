import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AirlineStaffRoutingModule } from "./airline-staff-routing.module";
import { SharedModule } from '../shared/shared.module';
import { CheckInComponent } from './check-in/check-in.component';
import { InFlightComponent } from './in-flight/in-flight.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [CheckInComponent, InFlightComponent],
  imports: [CommonModule, AirlineStaffRoutingModule, SharedModule, CoreModule],
})
export class AirlineStaffModule {}
