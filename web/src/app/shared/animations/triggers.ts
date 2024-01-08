import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';

export const EnterExitLeftTrigger = trigger('enterExitLeft', [
	transition(':enter', [
		style({ transform: 'translateX(-100%)' }),
		animate(
			'250ms ease-in',
			style({ transform: 'translateX(0)' })
		),
	]),
	transition(':leave', [
		style({ transform: 'translateX(0)' }),
		animate(
			'250ms ease-in',
			style({ transform: 'translateX(-100%)' })
		),
	]),
])

export const ContainerTrigger = trigger('container', [
	transition('* => void', [
		query('@*', [animateChild()], { optional: true }),
	]),
])