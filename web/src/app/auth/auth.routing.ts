import { Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { VerificationComponent } from './verification/verification.component';
import { RegisterComponent } from './register/register.component';

export const AuthRoutes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
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
				path: 'verify-account',
				component: VerificationComponent,
				data: {
					title: 'Verify account'
				}
			}
		]
	}
]