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
		{ path: ['/home'], icon: 'ri-survey-line', title: 'Home' },
		{ path: ['/sheet'], icon: 'ri-sticky-note-add-line', title: 'Sheet' },
		{ path: ['/board'], icon: 'ri-keyboard-box-line', title: 'Board' },
	]
}
