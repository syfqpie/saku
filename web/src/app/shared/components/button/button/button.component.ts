import { Component, Input, TemplateRef } from '@angular/core';
import { CompoSize, CompoSizes } from 'src/app/shared/models/component.model';

@Component({
	selector: 'sk-button',
	template: `
    <button
		class="sk-btn sk-btn-auth"
		[ngClass]="{
			'w-full': isFull,
			'sk-btn-xs': size === CompoSizes.XS,
			'sk-btn-sm': size === CompoSizes.SM,
			'sk-btn-md': size === CompoSizes.MD,
			'sk-btn-lg': size === CompoSizes.LG,
			'sk-btn-xl': size === CompoSizes.XL
		}">
     	<ng-container
			*ngTemplateOutlet="buttonTpl">
		</ng-container>
    </button>
  `,
	styles: [
	]
})
export class ButtonComponent {
	spinning = false

	@Input()
	isFull = false

	@Input()
	buttonTpl: TemplateRef<unknown> | null = null

	@Input()
	size: CompoSize = CompoSizes.MD

	readonly CompoSizes = CompoSizes
}
