import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, first } from 'rxjs';

import { LoadableComponent } from 'src/app/shared/models/base.model';
import { AuthFormMessage } from '../auth.constant';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-forgot',
	templateUrl: './forgot.component.html',
	styles: [],
})
export class ForgotComponent extends LoadableComponent implements OnInit, OnDestroy {

	form: FormGroup = new FormGroup({
		email: new FormControl(null),
	})
	formMessages = {
		email: AuthFormMessage.email,
	}
	hasRequested = false

	subscription = new Subscription()

	constructor(
		private fb: FormBuilder,
		private authSvc: AuthService
	) { super() }

	ngOnInit(): void { 
		this.initForm()
	}

	ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe()
	}

	private initForm(): void {
		this.form = this.fb.group({
			email: new FormControl(null, {
				validators: [
					Validators.required,
					Validators.email,
				],
				updateOn: 'blur',
			}),
		})
	}

	private reset(): void {
		this.toggleLoader()
		this.toggleForm()
		this.subscription.add(this.authSvc.resetPassword(this.form.value)
			.pipe(first())
			.subscribe({
				next: () => {
					this.toggleLoader()
					this.hasRequested = true
				},
				error: () => {
					this.toggleLoader()
					this.toggleForm()
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

	doPreReset(): void {
		if (this.form.valid) this.reset()
	}

}
