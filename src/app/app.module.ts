import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user-management/user.management.component';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LayoutComponent } from './shared/layout/layout.component';
import { DashboardCardComponent } from './shared/dashboard-card/dashboard-card.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LineChartComponent } from './shared/line-chart/line-chart.component';
import { LoginComponent } from './authentication/login/login.component';
import { JwtModule } from "@auth0/angular-jwt";
import { TemperatureHumidityComponent } from './histories/temperature-humidity/temperature.humidity.component';
import { SubstringPipe } from './pipes/SubstringPipe';
import { LogoutModalComponent } from './Modals/logout-modal/logout-modal.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import {MatChipsModule} from '@angular/material/chips';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserManagementComponent,
    SettingsComponent,
    LayoutComponent,
    DashboardCardComponent,
    LineChartComponent,
    LoginComponent,
    TemperatureHumidityComponent,
    SubstringPipe,
    LogoutModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    NoopAnimationsModule,
    FormsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    MatButtonModule,
    MatDialogModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MDBBootstrapModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
