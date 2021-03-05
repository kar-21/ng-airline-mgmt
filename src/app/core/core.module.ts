import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "../shared/shared.module";
import { LoginTokenComponent } from './login-token/login-token.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, LoginTokenComponent, LogoutComponent],
  imports: [CommonModule, SharedModule],
  exports: [LoginComponent],
})
export class CoreModule {}
