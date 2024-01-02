import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SheetItem } from '../../models/sheets.model';

@Component({
	selector: 'app-item-list',
	templateUrl: './item-list.component.html',
	styles: []
})
export class ItemListComponent {
	@Input()
		items: SheetItem[] = []
	
	form: FormGroup = this.fb.group({
		items: this.fb.array([])
	})

	constructor(
		private fb: FormBuilder
	) {}

	get $items() {
		return this.form.get('items') as FormArray
	}

	get totalValue() {
		return this.$items.value.reduce((acc: number, array: SheetItem) => {
			let currentAmount = 0

			if (!isNaN(Number(array.amount)) && array.amount >= 0) {
				currentAmount = array.amount
			}
		
			return acc + currentAmount
		}, 0)
	}

	private generateRow(
		item: string | null = null,
		amount = 0,
		is_checked = false
	) {
		return this.fb.group({
			item: [item, Validators.required],
			amount: [amount, Validators.compose([
				Validators.required,
				Validators.min(0)
			])],
			is_checked: [is_checked, Validators.required]
		})
	}

	public addItem() {
		this.$items.push(this.generateRow())
	}

	public deleteItem(index: number) {
		this.$items.removeAt(index)
	}

}
