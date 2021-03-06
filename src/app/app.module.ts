import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppReducer } from "./core/store/reducers/app.reducers";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { RouterModule } from "@angular/router";
import { PassangerEffect } from "./core/store/effects/passanger.effect";
import { NoAuthGuard } from "./core/guards/no-auth.guard";
import { AdminAuthGuard } from "./core/guards/admin-auth.guard";
import { StaffAuthGuard } from "./core/guards/staff-auth.guard";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    EffectsModule.forRoot([PassangerEffect]),
    StoreModule.forRoot(AppReducer),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    StoreDevtoolsModule.instrument(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  exports: [],
  providers: [NoAuthGuard, AdminAuthGuard, StaffAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
