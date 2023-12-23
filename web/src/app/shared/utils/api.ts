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