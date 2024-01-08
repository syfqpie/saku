import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';

import { LoadableComponent } from 'src/app/shared/models/base.model';
import { AuthService } from '../services/auth.service';
import { AuthFormMessage } from '../auth.constant';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: [],
})
export class LoginComponent extends LoadableComponent implements OnInit, OnDestroy {
	returnUrl: string | null = null
	redirectTimeout: ReturnType<typeof setTimeout> | null = null

	form: FormGroup = new FormGroup({
		username: new FormControl(null),
		password: new FormControl(null),
	})
	formMessages = {
		username: AuthFormMessage.username,
		password: AuthFormMessage.password,
	}

	subscription = new Subscription()

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authSvc: AuthService
	) {
		super()
		this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
	}

	ngOnInit(): void {
		this.initForm()
	}

	ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe()
	}

	private initForm(): void {
		this.form = this.fb.group({
			username: new FormControl(null, {
				validators: [
					Validators.required,
				],
				updateOn: 'blur',
			}),
			password: new FormControl(null, {
				validators: [
					Validators.required,
					Validators.minLength(8),
				],
				updateOn: 'blur',
			}),
		})
	}

	private login(): void {
		this.toggleLoader()
		this.toggleForm()
		this.subscription.add(this.authSvc.login(this.form.value)
			.pipe(first())
			.subscribe({
				next: () => {
					this.toggleLoader()
					this.toggleForm()
				},
				error: () => {
					this.toggleLoader()
					this.toggleForm()
				},
				complete: () => {
					/**
					 * TODO: add error handling
					 */
					// Set timeout for redirection
					this.redirectTimeout = setTimeout(
						() => {
							this.router.navigate(['/home'])
						}, 500
					)
				},
			}))
	}

	private toggleForm(): void {
		if (this.form.enabled) {
			this.form.disable()
		} else {
			this.form.enable()
		}
	}

	doPreLogin(): void {
		if (this.form.valid) this.login()
	}
}
