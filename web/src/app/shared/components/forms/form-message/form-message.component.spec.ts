import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMessageComponent } from './form-message.component';

describe('FormMessageComponent', () => {
	let component: FormMessageComponent;
	let fixture: ComponentFixture<FormMessageComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [FormMessageComponent]
		});
		fixture = TestBed.createComponent(FormMessageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
