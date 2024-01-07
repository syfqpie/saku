import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { GeneralComponent } from './general.component';
import { GeneralRoutes } from './general.routing';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { MobileMenuSidebarComponent } from './components/mobile-menu-sidebar/mobile-menu-sidebar.component';
import { SheetComponent } from './sheet/sheet.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { SheetItemComponent } from './components/sheet-item/sheet-item.component';

@NgModule({
	declarations: [
		GeneralComponent,
		HomeComponent,
		ItemListComponent,
		MenuSidebarComponent,
		MobileMenuSidebarComponent,
		SheetComponent,
		UserSidebarComponent,
		UserAvatarComponent,
		SheetItemComponent,
	],
	imports: [
		RouterModule.forChild(GeneralRoutes),
		SharedModule,
	],
})
export class GeneralModule { }
