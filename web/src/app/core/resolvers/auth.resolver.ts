import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

import { Profile } from 'src/app/general/models/profiles.model';
import { ProfilesService } from 'src/app/general/services/profiles.service';

export const AuthResolver: ResolveFn<Profile> = (
	_route: ActivatedRouteSnapshot,
	_state: RouterStateSnapshot
) => {
	return inject(ProfilesService).getAttached()
}
