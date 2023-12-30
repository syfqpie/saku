const ACCESS_KEY = 'saku-access'
const REFRESH_KEY = 'saku-refresh'

export const isAccessCookieExist = () => {
	const cookies = document.cookie
	return cookies.includes(ACCESS_KEY)
}

export const isRefreshCookieExist = () => {
	const cookies = document.cookie
	return cookies.includes(REFRESH_KEY)
}

export const invalidateCookies = () => {
	document.cookie = ACCESS_KEY +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	document.cookie = REFRESH_KEY +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}