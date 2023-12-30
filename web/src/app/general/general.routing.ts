import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GeneralComponent } from './general.component';
import { SheetComponent } from './sheet/sheet.component';

export const GeneralRoutes: Routes = [
	{
		path: '',
		component: GeneralComponent,
		children: [
			{
				path: 'home',
				component: HomeComponent
			},
			{
				path: 'sheet',
				component: SheetComponent
			}
		]
	}
]