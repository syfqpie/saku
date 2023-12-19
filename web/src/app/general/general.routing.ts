import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GeneralComponent } from './general.component';

export const GeneralRoutes: Routes = [
	{
		path: '',
		component: GeneralComponent,
		children: [
			{
				path: 'home',
				component: HomeComponent
			}
		]
	}
]