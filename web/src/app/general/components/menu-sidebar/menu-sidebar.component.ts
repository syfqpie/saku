import { Component } from '@angular/core';

interface Menu {
	path: string[];
	icon: string;
	title: string;
}

@Component({
	selector: 'app-menu-sidebar',
	templateUrl: './menu-sidebar.component.html',
	styles: [],
})
export class MenuSidebarComponent {
	public readonly menus: Menu[] = [
		{ path: ['/home'], icon: 'ri-home-3-line', title: 'Home' },
		{ path: ['/sheet'], icon: 'ri-sticky-note-add-line', title: 'Sheet' },
	]
}
