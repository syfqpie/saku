import { Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerificationComponent } from './verification/verification.component';

export const AuthRoutes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: 'forgot-password',
				component: ForgotComponent
			},
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'register',
				component: RegisterComponent,
				data: {
					title: 'Registration'
				}
			},
			{
				path: 'reset-password',
				component: ResetPasswordComponent
			},
			{
				path: 'verify-account',
				component: VerificationComponent,
				data: {
					title: 'Verify account'
				}
			}
		]
	}
]