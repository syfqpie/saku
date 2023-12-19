import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

const BASE_URL = `${environment.baseUrl}auth/`


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private http: HttpClient
	) { }

	/**
	 * Request to login
	 * 
	 * @param body - payload
	 * @param body.username - account username
	 * @param body.password - registered password
	 *
	 * @returns A login response (JWT) {@link LoginResponse}
	 */
	public login(body: object): Observable<object> {
		const urlTemp = `${BASE_URL}login/`
		return this.http.post(urlTemp, body)
			.pipe(tap(() => {
				// Save response TODO
			}))
	}

	/**
	 * Register new account
	 * 
	 * @param body - payload
	 * @param body.username - account username
	 * @param body.email? - account email
	 * @param body.password1 - password
	 * @param body.password2 - confirm password
	 *
	 * @returns A registration response (JWT) {@link DetailResponse}
	 */
	public register(body: object): Observable<object> {
		const urlTemp = `${BASE_URL}registration/`
		return this.http.post(urlTemp, body)
			.pipe(tap(() => {
				// Save response TODO
			}))
	}
}
