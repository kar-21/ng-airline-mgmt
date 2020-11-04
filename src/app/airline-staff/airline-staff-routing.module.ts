import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AirlineStaffComponent } from "./airline-staff.component";

const routes: Routes = [{ path: "", component: AirlineStaffComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirlineStaffRoutingModule {}
