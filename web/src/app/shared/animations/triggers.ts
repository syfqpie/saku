import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';

export const EnterExitLeftTrigger = trigger('enterExitLeft', [
	transition(':enter', [
		style({ opacity: 0, transform: 'translateX(-100%)' }),
		animate(
			'300ms ease-in',
			style({ opacity: 1, transform: 'translateX(0)' })
		),
	]),
	transition(':leave', [
		style({ opacity: 1, transform: 'translateX(0)' }),
		animate(
			'300ms ease-in',
			style({ opacity: 0, transform: 'translateX(-100%)' })
		),
	]),
])

export const ContainerTrigger = trigger('container', [
	transition('* => void', [
		query('@*', [animateChild()], { optional: true })
	]),
])