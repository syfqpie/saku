import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription, first } from 'rxjs';

import { Sheet } from '../models/sheets.model';
import { SheetService } from '../services/sheet.service';
import { LoadableComponent } from 'src/app/shared/models/base.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styles: [],
})
export class HomeComponent extends LoadableComponent implements OnInit, OnDestroy {

	public sheets: Sheet[] = []
	private subscription = new Subscription

	constructor(
		private router: Router,
		private sheetSvc: SheetService
	) {
		super()
	}

	ngOnInit(): void {
		this.getData()
	}

	ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe()
	}

	public getData() {
		this.isLoading = true
		this.subscription.add(this.sheetSvc.list()
			.pipe(first())
			.subscribe({
				next: (sheets: Sheet[]) => {
					this.sheets = sheets
					this.isLoading = false
				},
				error: (_error: HttpErrorResponse) => {
					this.isLoading = false
				},
			}))
	}

	public addNew() {
		return this.router.navigate(['/sheet', 'new'])
	}
}
