import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SheetItem } from '../../models/sheets.model';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-item-list',
	templateUrl: './item-list.component.html',
	styles: []
})
export class ItemListComponent implements OnInit, OnDestroy {
	@Input()
		items: SheetItem[] = []

	@Output()
		formValidEvent = new EventEmitter<SheetItem[]>()
	
	form: FormGroup = this.fb.group({
		items: this.fb.array([])
	})

	subscription: Subscription = new Subscription

	constructor(
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.subscription.add(
			this.form.statusChanges.subscribe(
				(formStatus) => {
					if (formStatus === 'VALID') {
						this.triggerValidEvent()
					}
				}
			)
		)
	}

	ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe()
	}

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

	private triggerValidEvent() {
		this.formValidEvent.emit(this.$items.value)
	}

}
