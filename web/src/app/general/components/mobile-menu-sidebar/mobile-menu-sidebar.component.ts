import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profiles.model';
import { ContainerTrigger, EnterExitLeftTrigger } from 'src/app/shared/animations/triggers';

@Component({
	selector: 'app-mobile-menu-sidebar',
	template: `
		<div *ngIf="isOpen" @container>
			<div class="bg-zinc-950/10 backdrop-blur-sm">
				<div @enterExitLeft class="flex">
					<div class="bg-zinc-900 w-[70vw]">
						<div class="px-6 pt-6">
							<div class="text-ellipsis overflow-hidden whitespace-nowrap">
								<div class="mb-3 flex justify-center">
									<app-user-avatar
										[username]="username">
									</app-user-avatar>
								</div>

								<p class="text-center font-semibold text-xl mb-3">
									{{ username }}
								</p>
							</div>
						</div>

						<app-menu-sidebar></app-menu-sidebar>

						<div class="px-6">
							<hr class="mb-6 mt-0 h-0.5 border-t-0 bg-zinc-600/10" />
							<sk-button
								[buttonTpl]="buttonTpl"
								[isFull]="true"
								size="sm"
								(click)="logout()">
								<ng-template #buttonTpl>
									<i class="ri-logout-circle-line"></i> Logout
								</ng-template>
							</sk-button>
						</div>
					</div>

					<div
						class="h-screen w-[30vw]"
						(click)="clickOutside()">
					</div>
				</div>
			</div>
		</div>
	`,
	styles: [
	],
	animations: [
		EnterExitLeftTrigger,
		ContainerTrigger
	]
})
export class MobileMenuSidebarComponent implements OnInit, OnDestroy {
	@Input()
	isOpen = false

	@Output()
	onClickOutside = new EventEmitter<null>()

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

	public clickOutside() {
		this.onClickOutside.emit(null)
	}

	logout(): void {
		this.authSvc.logout()
	}
}
