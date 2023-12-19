from datetime import datetime, timezone

from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from rest_framework import status
from rest_framework.response import Response
from dj_rest_auth.views import (
    PasswordChangeView as RestPasswordChangeView,
    PasswordResetView as RestPasswordResetView,
    PasswordResetConfirmView as RestPasswordResetConfirmView
)
from dj_rest_auth.registration.serializers import RegisterSerializer as RestRegisterSerializer
from dj_rest_auth.registration.views import (
    LoginView as RestLoginView,
    RegisterView as RestRegisterView,
    ResendEmailVerificationView as RestResendEmailVerificationView,
    VerifyEmailView as RestVerifyEmailView
)

from auth.serializers import PasswordResetSerializer


class LoginView(RestLoginView):
    """
    Check the credentials and return JWT if the credentials 
    are valid and authenticated

    Paramaters:
        username (string): user account username to login
        password (string): user password

    Returns:
        dict: token object
    """


class PasswordChangeView(RestPasswordChangeView):
    """
    Change password with old password to authenticate

    Paramaters:
        old_password (string): user current password
        new_password1 (string): use new password
        new_password2 (string): confirm user new password

    Returns:
        dict: detail message
    """


class PasswordResetView(RestPasswordResetView):
    """
    Request to reset password, will send an username with
    reset password steps

    Paramaters:
        username (string): user account username to reset

    Returns:
        dict: detail message
    """
    serializer_class = PasswordResetSerializer


class PasswordResetConfirmView(RestPasswordResetConfirmView):
    """
    Password reset email link is confirmed, therefore
    this resets the user's password

    Paramaters:
        uid (int): user id
        token (string): token received via email
        new_password1 (string): user new password
        new_password2 (string): confirm user new password

    Returns:
        dict: detail message
    """


class RegisterView(RestRegisterView):
    """
    Register new account and will send a verification
    email to the registered email

    Paramaters:
        username (string): user account username
        email (string) [optional]: user account email to register
        password1 (string): user password
        password2 (string): confirm user password

    Returns:
        dict: detail message
    """
    serializer_class = RestRegisterSerializer

    def get_response_data(self, user):
        with_email_msg = "Account created, an email has been sent to {email} but you may login"
        without_email_msg = "Account created, you may login"

        return {
            "detail":  with_email_msg.format(email=user.email) if user.email else without_email_msg
        }
    

class ResendVerificationView(RestResendEmailVerificationView):
    """
    Resend email verification if the email is already registered
    but not verified yet
    
    Parameters:
        email (string): email used for registration
    
    Returns:
        dict: detail message
    """


class VerifyEmailView(RestVerifyEmailView):
    """
    Verify a new registered account in the system

    Paramaters:
        key (string): token key received via email

    Returns:
        dict: detail message
    """
    def post(self, request, *args, **kwargs):
        """ Override to append custom validations and actions """
        # TODO: improve to allow login after verify
        
        # Get email address instance
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.kwargs["key"] = serializer.validated_data["key"]
        confirmation = self.get_object()

        if confirmation.email_address.verified:
            return Response(
                {"detail": _("This email address is already verified")},
                status=status.HTTP_400_BAD_REQUEST
            )

        User = get_user_model()
        user = User.objects.get(email=confirmation.email_address.email)
        user.verified_at = datetime.now(timezone.utc)

        # Confirm and return
        confirmation.confirm(self.request)
        user.save()
        return Response({"detail": _("ok")}, status=status.HTTP_200_OK)
