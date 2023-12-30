import { Component, Input } from '@angular/core';
import { SheetItem } from '../../models/sheet.model';

@Component({
	selector: 'app-item-list',
	templateUrl: './item-list.component.html',
	styles: []
})
export class ItemListComponent {
	@Input()
		items: SheetItem[] = []

	get totalValue() {
		return this.items.reduce((acc, array) => acc + array.value, 0)
	}
}
