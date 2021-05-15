import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { SeatsComponent } from './components/seats/seats.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { TableComponent } from './components/table/table.component';
import { PassangerInflightDetailsComponent } from './components/dialog/passanger-inflight-details/passanger-inflight-details.component';
import { PassangerCheckinDetailsComponent } from './components/dialog/passanger-checkin-details/passanger-checkin-details.component';
import { PassangerDetailsComponent } from './components/dialog/passanger-details/passanger-details.component';
import { MatSelectModule } from '@angular/material/select';
import { AirlineDetailsComponent } from './components/airline-details/airline-details.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SeatSelectionMenuComponent } from './components/seat-selection-menu/seat-selection-menu.component';

@NgModule({
  declarations: [
    SideNavComponent,
    AboutComponent,
    ExpansionPanelComponent,
    SeatsComponent,
    PassangerDetailsComponent,
    TableComponent,
    PassangerInflightDetailsComponent,
    PassangerCheckinDetailsComponent,
    AirlineDetailsComponent,
    SeatSelectionMenuComponent,
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
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSnackBarModule,
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    SideNavComponent,
    TableComponent,
    RouterModule,
    MatProgressSpinnerModule,
    ExpansionPanelComponent,
    MatExpansionModule,
    MatDividerModule,
    SeatsComponent,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSnackBarModule,
  ],
  entryComponents: [PassangerCheckinDetailsComponent, PassangerDetailsComponent, PassangerInflightDetailsComponent],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true, direction: 'ltr' },
    },
  ],
})
export class SharedModule {}
