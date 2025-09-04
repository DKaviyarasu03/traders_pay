import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPagesComponent } from './landing-pages/landing-pages.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TermsAndConditionsComponent } from './policies/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
   { path: '', component:LandingPagesComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'login', component:LoginComponent },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'terms-and-conditions', component:TermsAndConditionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
