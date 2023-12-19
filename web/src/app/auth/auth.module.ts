import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthRoutes } from './auth.routing';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [
		AuthComponent,
		LoginComponent
	],
	imports: [
		RouterModule.forChild(AuthRoutes),
		SharedModule
	]
})
export class AuthModule { }
