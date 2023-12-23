import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, first } from 'rxjs';

import { LoadableComponent } from 'src/app/shared/models/base.model';
import { AuthFormMessage } from '../auth.constant';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styles: []
})
export class ResetPasswordComponent extends LoadableComponent implements OnDestroy {
	redirectTimeout: ReturnType<typeof setTimeout> | null = null
	form: FormGroup = new FormGroup({
		uid: new FormControl(null),
		token: new FormControl(null),
		new_password1: new FormControl(null),
		new_password2: new FormControl(null)
	})
	formMessages = {
		new_password1: AuthFormMessage.password,
		new_password2: AuthFormMessage.confirmPassword
	}

	subscription = new Subscription()

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authSvc: AuthService
	) {
		super()
		const uid = this.route.snapshot.queryParamMap.get('uid')
		const token = this.route.snapshot.queryParamMap.get('key')

		if (!uid || !token) {
			this.router.navigate(['/auth', 'forgot-password'])
		} else {
			this.initForm(uid, token)
		}
	}

	ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe()
	}

	private initForm(uid: string, token: string): void {
		this.form = this.fb.group({
			uid: new FormControl(uid, {
				validators: [
					Validators.required
				],
				updateOn: 'blur'
			}),
			token: new FormControl(token, {
				validators: [
					Validators.required
				],
				updateOn: 'blur'
			}),
			new_password1: new FormControl(null, {
				validators: [
					Validators.required
				],
				updateOn: 'blur'
			}),
			new_password2: new FormControl(null, {
				validators: [
					Validators.required
				],
				updateOn: 'blur'
			})
		})
	}

	private reset(): void {
		this.toggleLoader()
		this.toggleForm()
		this.subscription.add(this.authSvc.confirmResetPassword(this.form.value)
			.pipe(first())
			.subscribe({
				next: () => {
					this.toggleLoader()
				},
				error: () => {
					this.toggleLoader()
					this.toggleForm()
				},
				complete: () => {
					this.redirectTimeout = setTimeout(
						() => {
							this.router.navigate(['/home'])
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

	doPreReset(): void {
		if (this.form.valid) this.reset()
	}

}
