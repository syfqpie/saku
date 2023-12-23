import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, NonAuthGuard } from './shared/guards/auth.guard';
import { AuthResolver } from './shared/resolvers/auth.resolver';

const routes: Routes = [
	{
		path: 'auth',
		canActivate: [NonAuthGuard],
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: '',
		canActivate: [AuthGuard],
		resolve: [AuthResolver],
		loadChildren: () => import('./general/general.module').then(m => m.GeneralModule)
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
