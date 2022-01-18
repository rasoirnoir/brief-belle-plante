import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { PageAccountComponent } from './pages/page-account/page-account.component';
import { PageForgotPasswordComponent } from './pages/page-forgot-password/page-forgot-password.component';
import { PageResetPasswordComponent } from './pages/page-reset-password/page-reset-password.component';
import { PageSigninComponent } from './pages/page-signin/page-signin.component';
import { PageSignupComponent } from './pages/page-signup/page-signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: PageSigninComponent },
  { path: 'signup', component: PageSignupComponent },
  { path: 'forgot-password', component: PageForgotPasswordComponent },
  { path: 'reset-password', component: PageResetPasswordComponent },
  { path: 'user', canActivate: [AuthGuard], component: PageAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
