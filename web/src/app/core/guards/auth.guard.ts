import { inject } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivateFn,
	CanDeactivateFn,
	Router,
	RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';

import { isRefreshCookieExist } from '../../shared/utils/api';
import { SheetComponent } from 'src/app/general/sheet/sheet.component';

const AUTH_PREFIX = '/auth'

export const NonAuthGuard: CanActivateFn = (
	_next: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
) => {
	if (state.url.startsWith(AUTH_PREFIX) && isRefreshCookieExist()) {
		return inject(Router).createUrlTree(['/home'])
	}
	
	return true
}

export const AuthGuard: CanActivateFn = (
	_next: ActivatedRouteSnapshot,
	_state: RouterStateSnapshot
) => {
	if (!isRefreshCookieExist()) {
		return inject(Router).createUrlTree(['/auth', 'login'])
	}
	
	return true
}

export const UnsavedChangesGuard: CanDeactivateFn<SheetComponent> = (
	component: SheetComponent,
	_currentRoute: ActivatedRouteSnapshot,
	_currentState: RouterStateSnapshot,
	_nextState: RouterStateSnapshot
) => {
	if (component.sheet !== undefined && component.isUpdatable()) {
		const body = component.getUpdateBody()

		return component.sheetSvc.patchSheet(
			component.sheet.id, body
		).pipe(map(() => true))
	}

	return true
}