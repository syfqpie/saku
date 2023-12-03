from django.urls import path, re_path
from django.views.generic import TemplateView

from dj_rest_auth.jwt_auth import get_refresh_view
from rest_framework_simplejwt.views import TokenVerifyView

from auth.views import LoginView, PasswordChangeView, PasswordResetView, \
    PasswordResetConfirmView, RegisterView, ResendVerificationView, VerifyEmailView


urlpatterns = [
    # URLs that do not require a session or valid token
    path("registration/", RegisterView.as_view(), name="public_register"),
    path("registration/verify-email/", VerifyEmailView.as_view(), name="account_email_verification_sent"),
    re_path(r"^registration/account-confirm-email/(?P<key>[-:\w]+)/$", TemplateView.as_view(), name="account_confirm_email"),
    path("registration/resend-email/", ResendVerificationView.as_view(), name="rest_resend_email"),
    path("login/", LoginView.as_view(), name="rest_login"),
    path("password/reset/", PasswordResetView.as_view(), name="rest_password_reset"),
    path("password/reset/confirm/", PasswordResetConfirmView.as_view(), name="rest_password_reset_confirm"),

    # URLs that require a user to be logged in with a valid token.
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("token/refresh/", get_refresh_view().as_view(), name="token_refresh"),
    path("password/change/", PasswordChangeView.as_view(), name="rest_password_change"),
]
