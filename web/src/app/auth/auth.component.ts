import { Component } from '@angular/core';

@Component({
	selector: 'app-auth',
	template: `
		<div
			class="flex flex-col justify-center align-middle p-10
			h-screen bg-zinc-900 text-zinc-200">
			<div class="grid grid-cols-12">
				<div class="col-start-5 col-span-3">
					<router-outlet></router-outlet>
				</div>
			</div>
		</div>
  	`,
	styles: [
	]
})
export class AuthComponent {

}
