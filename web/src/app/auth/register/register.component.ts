import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, first } from 'rxjs';

import { LoadableComponent } from 'src/app/shared/models/base.model';
import { AuthService } from '../services/auth.service';
import { AuthFormMessage } from '../auth.constant';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styles: [
	]
})
export class RegisterComponent extends LoadableComponent implements OnInit, OnDestroy {
	redirectTimeout: ReturnType<typeof setTimeout> | null = null

	form: FormGroup = new FormGroup({
		username: new FormControl(null),
		email: new FormControl(null),
		password1: new FormControl(null),
		password2: new FormControl(null)
	})
	formMessages = {
		username: AuthFormMessage.username,
		email: AuthFormMessage.email,
		password1: AuthFormMessage.password,
		password2: AuthFormMessage.confirmPassword
	}

	subscription = new Subscription()

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private authSvc: AuthService
	) {
		super()
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
					Validators.required
				],
				updateOn: 'blur'
			}),
			email: new FormControl(null, {
				validators: [
					Validators.email
				],
				updateOn: 'blur'
			}),
			password1: new FormControl(null, {
				validators: [
					Validators.required,
					Validators.minLength(8)
				],
				updateOn: 'blur'
			}),
			password2: new FormControl(null, {
				validators: [
					Validators.required,
					Validators.minLength(8)
				],
				updateOn: 'blur'
			})
		})
	}

	private register(): void {
		this.toggleLoader()
		this.toggleForm()
		
		const newForm: FormControl['value'] = {}
		for (const field in this.form.value) {
			const currentValue = this.form.value[field]

			if (
				currentValue !== null &&
				currentValue !== undefined
			) newForm[field as keyof typeof newForm] = currentValue
		}

		this.subscription.add(this.authSvc.register(newForm)
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
							this.router.navigate(['/auth', 'login'])
						}, 500
					)
				}
			}))
	}

	private toggleForm(): void {
		if (this.form.enabled) {
			this.form.disable()
		} else {
			this.form.enable()
		}
	}

	doPreRegister(): void {
		if (this.form.valid) this.register()
	}

}
