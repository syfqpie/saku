import { Component } from '@angular/core';

@Component({
	selector: 'app-general',
	template: `
		<div
			class="grid grid-cols-5 min-h-screen bg-zinc-900 text-zinc-200">
			<div
				class="hidden md:block col-span-1 border-r
				border-r-zinc-800 sticky h-screen top-0">
				<app-user-sidebar></app-user-sidebar>
			</div>

			<div class="col-span-5 md:col-span-3 p-6">
				<router-outlet></router-outlet>
			</div>

			<div
				class="hidden md:block col-span-1 border-l
				border-l-zinc-800 sticky h-screen top-0">
				<app-menu-sidebar></app-menu-sidebar>
			</div>

			<div class="block md:hidden absolute">
				<app-mobile-menu-sidebar
					[isOpen]="isMobileMenuOpen"
					(onClickOutside)="toggleMobileMenu()">
				</app-mobile-menu-sidebar>
			</div>
		</div>

		<div
			class="block md:hidden border-t border-t-zinc-800
			fixed bottom-0 left-0 z-50 w-full h-16 bg-zinc-900">
			<div class="grid h-full max-w-lg grid-cols-1 mx-auto font-medium">
				<button
					type="button"
					class="inline-flex flex-col items-center justify-center px-5
					text-zinc-400"
					(click)="toggleMobileMenu()">
					<ng-container *ngIf="isMobileMenuOpen; else notOpenTpl">
						<i class="ri-menu-fold-line text-3xl"></i>
					</ng-container>

					<ng-template #notOpenTpl>
						<i class="ri-menu-unfold-line text-3xl"></i>
					</ng-template>
				</button>
			</div>
		</div>
  	`,
	styles: [
	]
})
export class GeneralComponent {
	isMobileMenuOpen = true

	toggleMobileMenu() {
		this.isMobileMenuOpen = !this.isMobileMenuOpen
	}
}
