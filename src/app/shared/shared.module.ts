import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [SideNavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    SideNavComponent,
    RouterModule,
  ],
})
export class SharedModule {}
