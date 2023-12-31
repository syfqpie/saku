import { Component, Input } from '@angular/core';
import { Sheet } from '../../models/sheets.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sheet-item',
	template: `
		<ng-container *ngIf="sheet">
			<div class="sk-sheet">
				<button
					class="sk-sheet-view-btn"
					(click)="viewSheet()">
					<p>
						{{ sheet.title }}
					</p>

					<p class="text-xs text-white/60">
						<i class="ri-time-line"></i>
						{{ sheet.created_at | date: 'dd/MM/yyyy' }}
					</p>
				</button>

				<button class="sk-sheet-rm-btn">
					<i class="ri-delete-bin-2-line"></i>
				</button>
			</div>
		</ng-container>
  	`,
	styles: [
	]
})
export class SheetItemComponent {
	@Input()
	sheet?: Sheet

	constructor(
		private router: Router
	) {}

	public viewSheet() {
		return this.router.navigate(['/sheet', this.sheet!.id])
	}
}
