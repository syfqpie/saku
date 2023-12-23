import { Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpStatusCode,
	HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { HttpHeaderConfig, JsonActionTypes } from '../../shared/constants/http.constant';
import { isRefreshCookieExist } from 'src/app/shared/utils/api';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

	constructor(
		private router: Router,
		private authSvc: AuthService
	) { }

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		request = this.configureHeader(request)

		return next.handle(request).pipe(
			map((event: HttpEvent<unknown>) => {
				return event
			}),
			catchError((err) => {
				return this.handleError(request, next, err)
			})
		)
	}

	private configureHeader(req: HttpRequest<unknown>): HttpRequest<unknown> {
		const headers = new HttpHeaders()
		headers.append(HttpHeaderConfig.ACCEPT, HttpHeaderConfig.ACCEPT_VALUE)

		if (JsonActionTypes.includes(req.method)) {
			headers.append(HttpHeaderConfig.CONTENT_TYPE, HttpHeaderConfig.CONTENT_TYPE_JSON)
		}

		return req.clone({
			withCredentials: true
		})
	}

	private handleError(
		request: HttpRequest<unknown>,
		next: HttpHandler,
		error: HttpErrorResponse
	): Observable<HttpEvent<unknown>> {
		if (navigator.onLine && error instanceof HttpErrorResponse) {
			if (
				error.status === HttpStatusCode.Unauthorized &&
				isRefreshCookieExist()
			) {
				// could be access token expired so we are going
				// to refresh the token
				return this.handleExpiredAccessToken(request, next)
			} else if (
				error.status === HttpStatusCode.Unauthorized &&
				!isRefreshCookieExist()
			) {
				// could be refresh token expired
				this.router.navigate(['/auth', 'login'])
			}
			// TODO: handle forbidden error
		}

		if (isDevMode()) console.error('It happens: ', error);

		return throwError(() => error)
	}

	private handleExpiredAccessToken(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return this.authSvc.refreshToken().pipe(
			switchMap(() => {
				return next.handle(this.configureHeader(request))
			}),
			catchError((err) => {
				return throwError(() => err)
			})
		)
	}
}
