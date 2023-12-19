import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';

import { LoadableComponent } from 'src/app/shared/models/base.model';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-verification',
	templateUrl: './verification.component.html',
	styles: []
})
export class VerificationComponent extends LoadableComponent implements OnDestroy {
	redirectTimeout: ReturnType<typeof setTimeout> | null = null

	form: FormGroup = new FormGroup({
		key: new FormControl(null)
	})
	hasError = false
	subscription = new Subscription()
	

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authSvc: AuthService
	) {
		super()
		const key = this.route.snapshot.queryParamMap.get('key')
		this.initForm(key) 
	}

	ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe()
	}
	
	initForm(key: string | null) {
		this.form = this.fb.group({
			key: new FormControl(key, {
				validators: [
					Validators.required
				],
				updateOn: 'blur'
			})
		})

		this.doPreVerify()
	}

	private verify(): void {
		this.toggleLoader()
		this.subscription.add(this.authSvc.verifyAccount(this.form.value)
			.pipe(first())
			.subscribe({
				next: () => {
					this.toggleLoader()
				},
				error: () => {
					this.toggleLoader()
					this.hasError = true
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

	private doPreVerify(): void {
		if (this.form.valid) this.verify()
	}
}
