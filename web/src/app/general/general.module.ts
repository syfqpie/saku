import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { GeneralComponent } from './general.component';
import { GeneralRoutes } from './general.routing';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';

@NgModule({
	declarations: [
		GeneralComponent,
		HomeComponent,
		MenuSidebarComponent,
		UserSidebarComponent,
		UserAvatarComponent,
	],
	imports: [
		RouterModule.forChild(GeneralRoutes),
		SharedModule
	]
})
export class GeneralModule { }
