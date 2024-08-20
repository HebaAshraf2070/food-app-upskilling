import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { VerifyPopUpComponent } from './components/verifyPopUp/verifyPopUp.component';

const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "verify", component: VerifyComponent },
  { path: "forgetPassword", component: ForgetPassComponent },
  { path: "resetPassword", component: ResetPassComponent },
  { path: 'verifyPopUp', component: VerifyPopUpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
