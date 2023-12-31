import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetItemComponent } from './sheet-item.component';

describe('SheetItemComponent', () => {
	let component: SheetItemComponent;
	let fixture: ComponentFixture<SheetItemComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SheetItemComponent]
		});
		fixture = TestBed.createComponent(SheetItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
