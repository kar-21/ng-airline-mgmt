import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminAuthGuard } from "./core/guards/admin-auth.guard";
import { NoAuthGuard } from "./core/guards/no-auth.guard";
import { StaffAuthGuard } from "./core/guards/staff-auth.guard";
import { LoginTokenComponent } from "./core/login-token/login-token.component";
import { LoginComponent } from "./core/login/login.component";
import { AboutComponent } from "./shared/components/about/about.component";

const routes: Routes = [
  {
    path: "tokens",
    component: LoginTokenComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: "",
    loadChildren: () =>
      import("./airline-staff/airline-staff.module").then(
        (m) => m.AirlineStaffModule
      ),
    canActivate: [StaffAuthGuard],
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
    canActivate: [AdminAuthGuard],
  },
  { path: "login", component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: "about", component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
