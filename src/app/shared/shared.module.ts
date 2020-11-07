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
import { AboutComponent } from "./components/about/about.component";
import { AirlineListComponent } from "./components/airline-list/airline-list.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ExpansionPanelComponent } from "./components/expansion-panel/expansion-panel.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDividerModule } from "@angular/material/divider";
import { SeatsComponent } from "./components/seats/seats.component";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    SideNavComponent,
    AboutComponent,
    AirlineListComponent,
    ExpansionPanelComponent,
    SeatsComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDividerModule,
    FlexLayoutModule,
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
    MatProgressSpinnerModule,
    ExpansionPanelComponent,
    MatExpansionModule,
    MatDividerModule,
    SeatsComponent,
    FlexLayoutModule,
  ],
})
export class SharedModule {}
