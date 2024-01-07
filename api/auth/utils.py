from dj_rest_auth.app_settings import api_settings
from dj_rest_auth.jwt_auth import (
    set_jwt_cookies as rest_set_jwt_cookies,
    JWTCookieAuthentication as RestJWTCookieAuthentication
)
from dj_rest_auth.utils import jwt_encode

from auth import constants


def set_jwt_cookies(user, response):
    access_token, refresh_token = jwt_encode(user)
    rest_set_jwt_cookies(response, access_token, refresh_token)


class JWTCookieAuthentication(RestJWTCookieAuthentication):
    def authenticate(self, request):
        cookie_name = api_settings.JWT_AUTH_COOKIE
        header = self.get_header(request)

        if header is None and cookie_name and request.path in constants.SAFE_AUTH_ROUTES:
            return None

        return super().authenticate(request)
