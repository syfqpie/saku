import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { GeneralComponent } from './general.component';
import { GeneralRoutes } from './general.routing';

@NgModule({
	declarations: [
		GeneralComponent,
		HomeComponent
	],
	imports: [
		RouterModule.forChild(GeneralRoutes),
		SharedModule
	]
})
export class GeneralModule { }
