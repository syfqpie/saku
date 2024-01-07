import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMenuSidebarComponent } from './mobile-menu-sidebar.component';

describe('MobileMenuSidebarComponent', () => {
	let component: MobileMenuSidebarComponent;
	let fixture: ComponentFixture<MobileMenuSidebarComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MobileMenuSidebarComponent],
		});
		fixture = TestBed.createComponent(MobileMenuSidebarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
