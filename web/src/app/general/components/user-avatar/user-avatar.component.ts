import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-user-avatar',
	templateUrl: './user-avatar.component.html',
	styles: [],
})
export class UserAvatarComponent {

	@Input()
		username: string | null = null

	get initialUsername() {
		return this.username ? this.username[0].toLocaleUpperCase() : '-'
	}
}
