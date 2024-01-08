import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthRoutes } from './auth.routing';
import { SharedModule } from '../shared/shared.module';

import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerificationComponent } from './verification/verification.component';

@NgModule({
	declarations: [
		AuthComponent,
		ForgotComponent,
		LoginComponent,
		RegisterComponent,
		ResetPasswordComponent,
		VerificationComponent,
	],
	imports: [
		RouterModule.forChild(AuthRoutes),
		SharedModule,
	],
})
export class AuthModule { }
