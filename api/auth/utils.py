from dj_rest_auth.jwt_auth import set_jwt_cookies as rest_set_jwt_cookies
from dj_rest_auth.utils import jwt_encode


def set_jwt_cookies(user, response):
    access_token, refresh_token = jwt_encode(user)
    rest_set_jwt_cookies(response, access_token, refresh_token)
