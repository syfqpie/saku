import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { isRefreshCookieExist } from '../utils/api';

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