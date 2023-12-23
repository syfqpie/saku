import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { invalidateCookies } from 'src/app/shared/utils/api';
import { AUTH_PREFIX } from 'src/app/shared/constants/prefixes.constant';

const BASE_URL = `${environment.baseUrl}${AUTH_PREFIX}/`


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private http: HttpClient,
		private router: Router
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
				// noop
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
	 * @returns A detail response {@link DetailResponse}
	 */
	public register(body: object): Observable<object> {
		const urlTemp = `${BASE_URL}registration/`
		return this.http.post(urlTemp, body)
			.pipe(tap(() => {
				// noop
			}))
	}

	/**
	 * Verify account
	 * 
	 * @param body - payload
	 * @param body.key - verification key key
	 *
	 * @returns A detail response {@link DetailResponse}
	 */
	public verifyAccount(body: object): Observable<object> {
		const urlTemp = `${BASE_URL}registration/verify-email/`
		return this.http.post(urlTemp, body)
			.pipe(tap(() => {
				// noop
			}))
	}

	/**
	 * Reset account password
	 * 
	 * @param body - payload
	 * @param body.email - user registered email
	 *
	 * @returns A detail response {@link DetailResponse}
	 */
	public resetPassword(body: object): Observable<object> {
		const urlTemp = `${BASE_URL}password/reset/`
		return this.http.post(urlTemp, body)
			.pipe(tap(() => {
				// noop
			}))
	}

	/**
	 * Confirm reset account password
	 * 
	 * @param body - payload
	 * @param body.uid - received uid
	 * @param body.token - received token
	 * @param body.new_password1 - user new password
	 * @param body.new_password2 - user confirm new password
	 *
	 * @returns A detail response {@link DetailResponse}
	 */
	public confirmResetPassword(body: object): Observable<object> {
		const urlTemp = `${BASE_URL}password/reset/confirm/`
		return this.http.post(urlTemp, body)
			.pipe(tap(() => {
				// noop
			}))
	}

	/**
	 * Verify token
	 *
	 * @returns A detail response {@link DetailResponse}
	 */
	public verifyToken(body: object): Observable<object> {
		const urlTemp = `${BASE_URL}token/verify/`
		return this.http.post(urlTemp, body)
			.pipe(tap(() => {
				// noop
			}))
	}

	/**
	 * Refresh token
	 *
	 * @returns A detail response {@link DetailResponse}
	 */
	public refreshToken(): Observable<object> {
		const urlTemp = `${BASE_URL}token/refresh/`
		return this.http.post(urlTemp, {})
			.pipe(tap(() => {
				// noop
			}))
	}

	public logout(): Promise<boolean> {
		invalidateCookies()
		return this.router.navigate(['/auth', 'login'])
	}
}
