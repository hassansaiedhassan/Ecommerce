import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { authGuard } from '../auth.guard';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
  {path:'',redirectTo:'forgot',pathMatch:'full'},

  {path:'forgot',canActivate:[!authGuard],component:ForgotPasswordComponent},
   {path:'home',canActivate:[authGuard],component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {

 }
