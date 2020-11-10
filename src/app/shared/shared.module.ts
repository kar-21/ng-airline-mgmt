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
import { DialogComponent } from "./components/dialog/dialog.component";
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from "@angular/material/dialog";

@NgModule({
  declarations: [
    SideNavComponent,
    AboutComponent,
    AirlineListComponent,
    ExpansionPanelComponent,
    SeatsComponent,
    DialogComponent,
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
    MatDialogModule,
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
    MatDialogModule,
  ],
  entryComponents: [DialogComponent],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true, direction: "ltr" },
    },
  ],
})
export class SharedModule {}
