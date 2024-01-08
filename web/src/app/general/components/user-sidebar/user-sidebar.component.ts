import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Profile } from '../../models/profiles.model';
import { ProfileService } from '../../services/profile.service';

@Component({
	selector: 'app-user-sidebar',
	templateUrl: './user-sidebar.component.html',
	styles: [],
})
export class UserSidebarComponent implements OnInit, OnDestroy {
	public profile: Profile | null = null
	private subscription: Subscription = new Subscription()

	constructor(
		private authSvc: AuthService,
		private profileSvc: ProfileService
	) {}

	ngOnInit(): void {
		this.subscription.add(
			this.profileSvc.profile.subscribe((profile) => {
				this.profile = profile
			})
		)
	}

	ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe()
	}

	get username() {
		return this.profile ? this.profile.username : null
	}

	logout(): void {
		this.authSvc.logout()
	}

}
