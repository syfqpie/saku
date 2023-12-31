import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { API_VERSION, SHEETS_PREFIX } from 'src/app/shared/constants/prefixes.constant';
import { Sheet } from '../models/sheets.model';

const BASE_URL = `${environment.baseUrl}${API_VERSION}/${SHEETS_PREFIX}/`


@Injectable({
	providedIn: 'root'
})
export class SheetService {
	private sheetsSubject: BehaviorSubject<Sheet[]> = new BehaviorSubject<Sheet[]>([])
	public sheets: Observable<Sheet[]>

	constructor(
		private http: HttpClient
	) {
		this.sheets = this.sheetsSubject.asObservable();
	}

	/**
	 * List owned sheets
	 * 
	 * @returns list of sheet objects
	 */
	public listSheets(): Observable<Sheet[]> {
		const urlTemp = `${BASE_URL}`
		return this.http.get<Sheet[]>(urlTemp)
			.pipe(map((sheets) => {
				this.sheetsSubject.next(sheets)
				return sheets
			}))
	}

	/**
	 * Get sheet with id
	 * 
	 * @param id id of sheet
	 * @returns sheet object
	 */
	public getSheet(id: string): Observable<Sheet> {
		const urlTemp = `${BASE_URL}${id}`
		return this.http.get<Sheet>(urlTemp)
			.pipe(map((sheet) => {
				return sheet
			}))
	}

	/**
	 * Delete sheet
	 * 
	 * @param id id of sheet
	 * @returns null
	 */
	public delete(id: string): Observable<null> {
		const urlTemp = `${BASE_URL}${id}`
		return this.http.delete<null>(urlTemp)
			.pipe(map((response) => {
				return response
			}))
	}

}
