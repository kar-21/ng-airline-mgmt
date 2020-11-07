import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CheckInComponent } from "./check-in/check-in.component";
import { InFlightComponent } from "./in-flight/in-flight.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "checkIn",
    pathMatch: "full",
  },
  { path: "checkIn", component: CheckInComponent },
  {
    path: "inFlight",
    component: InFlightComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirlineStaffRoutingModule {}
