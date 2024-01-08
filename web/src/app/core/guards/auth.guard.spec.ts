import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { NonAuthGuard } from './auth.guard';

describe('NonAuthGuard', () => {
	const executeGuard: CanActivateFn = (...guardParameters) =>
		TestBed.runInInjectionContext(() => NonAuthGuard(...guardParameters));

	beforeEach(() => {
		TestBed.configureTestingModule({});
	});

	it('should be created', () => {
		expect(executeGuard).toBeTruthy();
	});
});
