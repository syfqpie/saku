import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';

import { Sheet, SheetItem } from '../models/sheets.model';
import { SheetService } from '../services/sheet.service';

@Component({
	selector: 'app-sheet',
	templateUrl: './sheet.component.html',
	styles: [],
})
export class SheetComponent implements OnDestroy {
	public itemsHasUnsavedChanges = false
	public sheet?: Sheet
	private subscription = new Subscription
	public currentSheetItem: SheetItem[] = []

	public form: FormGroup = new FormGroup({
		title: new FormControl(null),
	})

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public sheetSvc: SheetService
	) {
		const id = this.activatedRoute.snapshot.paramMap.get('id')
		if (id) this.getData(id)
		else this.setFormData()
	}

	ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe()
	}

	private getData(id: string) {
		this.subscription.add(this.sheetSvc.getSheet(id)
			.pipe(first())
			.subscribe({
				next: (sheet) => {
					this.sheet = sheet
					this.setFormData()
				},
			}))
	}

	private setFormData() {
		this.form = this.fb.group({
			title: new FormControl(this.sheet?.title ?? null, {
				validators: [
					Validators.required,
				],
				updateOn: 'blur',
			}),
		})

		this.currentSheetItem = this.sheet?.items ?? []
	}

	public onItemsFormValid(formData: SheetItem[]) {
		this.currentSheetItem = formData

		if (
			this.sheet && this.sheet.items &&
			this.isEqualSheetItem(this.currentSheetItem, this.sheet.items)
		) {
			this.itemsHasUnsavedChanges = false
		} else if (
			this.sheet && this.sheet.items &&
			!this.isEqualSheetItem(this.currentSheetItem, this.sheet.items)
		) {
			this.itemsHasUnsavedChanges = true
		}
	}

	private isEqualSheetItem(next: SheetItem[], current: SheetItem[]) {
		return (
			next.length === current.length &&
			next.every(
				next_item => current.some(
					current_item =>
						next_item.item === current_item.item &&
						next_item.amount === current_item.amount &&
						next_item.is_checked === current_item.is_checked
				)
			)
		)
	}

	public navigateBack() {
		this.router.navigate(['/home'])
	}

	public isUpdatable() {
		const isFormChanged = this.form.value.title !== this.sheet?.title || this.itemsHasUnsavedChanges
		return isFormChanged && this.form.valid
	}

	public onSave() {
		if (this.isUpdatable()) this.saveSheet()
	}

	public getUpdateBody() {
		const body: {title?: string; items?: SheetItem[]} = {}

		if (this.form.value.title !== this.sheet?.title) {
			body.title = this.form.value.title
		}
		if (this.itemsHasUnsavedChanges) {
			body.items = this.currentSheetItem
		}

		return body
	}

	private saveSheet() {
		if (this.sheet){
			const body = this.getUpdateBody()

			this.subscription.add(
				this.sheetSvc.patchSheet(this.sheet.id, body)
					.pipe(first())
					.subscribe()
			)
		}
	}
}
