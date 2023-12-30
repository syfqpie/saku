import { Component, Input, TemplateRef } from '@angular/core';
import { CompoSize, CompoSizes } from 'src/app/shared/models/component.model';

@Component({
	selector: 'sk-button',
	template: `
    <button
		class="sk-btn"
		[ngClass]="{
			'w-full': isFull,
			'sk-btn-auth': isAuth,
			'sk-btn-default': !isAuth,
			'sk-btn-xs': size === CompoSizes.XS,
			'sk-btn-sm': size === CompoSizes.SM,
			'sk-btn-md': size === CompoSizes.MD,
			'sk-btn-lg': size === CompoSizes.LG,
			'sk-btn-xl': size === CompoSizes.XL
		}"
		[disabled]="disabled">
		<ng-container *ngIf="spinning; else notSpinning">
			<i class="ri-loader-3-line animate-spin block"></i>
		</ng-container>

		<ng-template #notSpinning>
			<ng-container
				*ngTemplateOutlet="buttonTpl">
			</ng-container>
		</ng-template>
    </button>
  `,
	styles: [
	]
})
export class ButtonComponent {
	@Input()
	disabled = false

	@Input()
	spinning = false

	@Input()
	isFull = false

	@Input()
	buttonTpl: TemplateRef<unknown> | null = null

	@Input()
	size: CompoSize = CompoSizes.MD

	@Input()
	isAuth = false

	readonly CompoSizes = CompoSizes
}
