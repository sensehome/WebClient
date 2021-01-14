import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { TemperatureHumidityDashboardComponent } from './dashboard-table/temperature-humidity-dashboard/temperature-humidity-dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './services/authentication-guard.service';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "home"},
  {path: "home", component: HomeComponent, canActivate:[AuthGuard]},
  {path: "history/temperature-humidity", component: TemperatureHumidityDashboardComponent, canActivate:[AuthGuard]},
  {path: "users", component: ProfileComponent},
  {path: "settings", component: SettingsComponent},
  {path: "login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
