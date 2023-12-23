import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { API_VERSION, PROFILES_PREFIX } from 'src/app/shared/constants/prefixes.constant';
import { Profile } from '../models/profiles.model';

const BASE_URL = `${environment.baseUrl}${API_VERSION}/${PROFILES_PREFIX}/`

@Injectable({
	providedIn: 'root'
})
export class ProfilesService {
	private profileSubject: BehaviorSubject<Profile | null> = new BehaviorSubject<Profile | null>(null)
	public profile: Observable<Profile | null>

	constructor(
		private http: HttpClient
	) {
		this.profile = this.profileSubject.asObservable();
	}

	/**
	 * Get attached profile
	 *
	 * @returns user attached profile {@link Profile}
	 */
	public getAttached(): Observable<Profile> {
		const urlTemp = `${BASE_URL}get-attached/`
		return this.http.get<Profile>(urlTemp)
			.pipe(map((profile) => {
				this.profileSubject.next(profile)
				return profile
			}))
	}

}
