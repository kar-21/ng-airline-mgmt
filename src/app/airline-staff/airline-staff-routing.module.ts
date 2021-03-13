import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffAuthGuard } from '../core/guards/staff-auth.guard';
import { CheckInComponent } from './check-in/check-in.component';
import { InFlightComponent } from './in-flight/in-flight.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'checkIn',
    pathMatch: 'full',
    canActivate: [StaffAuthGuard],
  },
  {
    path: 'checkIn',
    component: CheckInComponent,
    canActivate: [StaffAuthGuard],
  },
  {
    path: 'inFlight',
    component: InFlightComponent,
    canActivate: [StaffAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirlineStaffRoutingModule {}
