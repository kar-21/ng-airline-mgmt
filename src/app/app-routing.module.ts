import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./core/login/login.component";
import { AboutComponent } from "./shared/components/about/about.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./airline-staff/airline-staff.module").then(
        (m) => m.AirlineStaffModule
      ),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then(
        (m) => m.AdminModule
      ),
  },
  { path: "login", component: LoginComponent },
  { path: "about", component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
