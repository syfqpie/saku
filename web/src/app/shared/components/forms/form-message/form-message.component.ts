import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormMessage } from 'src/app/shared/models/base.model';

// TODO: add animation
@Component({
	selector: 'sk-form-message',
	template: `
		<ng-template [ngIf]="isShow">
			<ng-container *ngFor="let msg of messages">
				<ng-template
					[ngIf]="control!.hasError(msg.type) && (
						control!.dirty ||
						control!.touched
					)">
					<p class="mt-2 text-xs text-red-800">
						{{ msg.message }}
					</p> 
				</ng-template>
			</ng-container>  
		</ng-template>
  	`,
	styles: [
	]
})
export class FormMessageComponent {
	@Input()
	control: AbstractControl | null = null

	@Input()
	controlName: string | null = null

	@Input()
	messages: FormMessage[] = []

	get isShow() {
		if (
			!this.control ||
			!this.controlName ||
			this.messages.length === 0
		) return false

		return Boolean(this.control.errors) && (
			this.control.dirty ||
			this.control.touched
		)
	}
	
}
