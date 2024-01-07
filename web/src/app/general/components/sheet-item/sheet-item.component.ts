import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription, first } from 'rxjs';
import { Router } from '@angular/router';

import { Sheet } from '../../models/sheets.model';
import { SheetService } from '../../services/sheet.service';


@Component({
	selector: 'app-sheet-item',
	template: `
		<ng-container *ngIf="sheet">
			<div class="sk-sheet">
				<button
					class="sk-sheet-view-btn"
					(click)="viewSheet()">
					<p class="truncate">
						{{ sheet.title }}
					</p>

					<p class="text-xs text-white/60">
						<i class="ri-time-line"></i>
						{{ sheet.created_at | date: 'dd/MM/yyyy' }}
					</p>
				</button>

				<button
					class="sk-sheet-rm-btn"
					(click)="deleteSheet()">
					<i class="ri-delete-bin-2-line"></i>
				</button>
			</div>
		</ng-container>
  	`,
	styles: [
	]
})
export class SheetItemComponent implements OnDestroy {
	@Input()
	sheet?: Sheet
	
	public subscription: Subscription = new Subscription

	constructor(
		private router: Router,
		private sheetSvc: SheetService
	) {}

	ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe()
	}

	public viewSheet() {
		return this.router.navigate(['/sheet', this.sheet!.id])
	}

	public deleteSheet() {
		if (this.sheet) {
			this.subscription.add(this.sheetSvc.delete(this.sheet.id)
				.pipe(first())
				.subscribe({
					next: (res) => {
						// TODO: Send signal to refresh
					}
			}))
		}
	}
}
