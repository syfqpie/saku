import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { AuthResolver } from './auth.resolver';
import { Profile } from 'src/app/general/models/profiles.model';

describe('authResolver', () => {
	const executeResolver: ResolveFn<Profile> = (...resolverParameters) =>
		TestBed.runInInjectionContext(() => AuthResolver(...resolverParameters));

	beforeEach(() => {
		TestBed.configureTestingModule({});
	});

	it('should be created', () => {
		expect(executeResolver).toBeTruthy();
	});
});
