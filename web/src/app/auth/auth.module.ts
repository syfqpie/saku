import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthRoutes } from './auth.routing';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
	declarations: [
		AuthComponent,
		LoginComponent,
		RegisterComponent,
	],
	imports: [
		RouterModule.forChild(AuthRoutes),
		SharedModule
	]
})
export class AuthModule { }
