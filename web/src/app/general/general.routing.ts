import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GeneralComponent } from './general.component';
import { SheetComponent } from './sheet/sheet.component';
import { UnsavedChangesGuard } from '../core/guards/auth.guard';

export const GeneralRoutes: Routes = [
	{
		path: '',
		component: GeneralComponent,
		children: [
			{
				path: 'home',
				component: HomeComponent,
			},
			{
				path: 'sheet/:id',
				component: SheetComponent,
				canDeactivate: [UnsavedChangesGuard],
			},
		],
	},
]