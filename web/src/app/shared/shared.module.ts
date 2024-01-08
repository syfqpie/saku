import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ButtonComponent } from './components/button/button.component';
import { FormMessageComponent } from './components/forms/form-message/form-message.component';
import { InputDirective } from './directives/forms/input.directive';

@NgModule({
	declarations: [
		ButtonComponent,
		FormMessageComponent,
		InputDirective,
	],
	imports: [
		CommonModule,
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		ButtonComponent,
		FormMessageComponent,
		InputDirective,
	],
})
export class SharedModule { }
