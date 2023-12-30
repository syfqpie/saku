import { Component } from '@angular/core';

@Component({
	selector: 'app-general',
	template: `
		<div
			class="grid grid-cols-5 min-h-screen bg-zinc-900 text-zinc-200">
			<div class="col-span-1 border-r border-r-zinc-800 sticky h-screen top-0">
				<app-user-sidebar></app-user-sidebar>
			</div>

			<div class="col-span-3 p-6">
				<router-outlet></router-outlet>
			</div>

			<div class="col-span-1 border-l border-l-zinc-800 sticky h-screen top-0">
				<app-menu-sidebar></app-menu-sidebar>
			</div>
		</div>
  	`,
	styles: [
	]
})
export class GeneralComponent {

}
