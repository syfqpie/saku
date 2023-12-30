import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { GeneralComponent } from './general.component';
import { GeneralRoutes } from './general.routing';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { SheetComponent } from './sheet/sheet.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';

@NgModule({
	declarations: [
		GeneralComponent,
		HomeComponent,
		ItemListComponent,
		MenuSidebarComponent,
		SheetComponent,
		UserSidebarComponent,
		UserAvatarComponent,
	],
	imports: [
		RouterModule.forChild(GeneralRoutes),
		SharedModule
	]
})
export class GeneralModule { }
