import { Directive, ElementRef, Input } from '@angular/core';
import { CompoSize, CompoSizes } from '../../models/component.model';

@Directive({
	selector: '[skInput]'
})
export class InputDirective {
	private readonly inputClass: string = 'sk-form'
	private size: string | undefined = undefined

	@Input() skInput: CompoSize | null = null

	constructor(private elRef: ElementRef) {
		if (
			this.skInput == CompoSizes.SM ||
			this.skInput == CompoSizes.LG
		) this.size = `sk-form-${this.skInput}`
		else this.size = `sk-form-${CompoSizes.MD}`

		this.elRef.nativeElement.className = `${this.inputClass} ${this.size} ${this.elRef.nativeElement.className}`
	}

}
