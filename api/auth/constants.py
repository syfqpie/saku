TEMPLATE_EMAIL_BASE_PATH = "account/email/"
TEMPLATE_EMAIL_CONFIRM_BASE_FILENAME = "email_confirmation"

SAFE_AUTH_ROUTES = [
    "/auth/registration/",
    "/auth/registration/verify-email/",
    "/auth/registration/account-confirm-email",
    "/auth/registration/resend-email/",
    "/auth/login/",
    "/auth/password/reset/",
    "/auth/password/reset/confirm/",
]