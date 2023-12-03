from allauth.account.adapter import DefaultAccountAdapter

from auth.constants import TEMPLATE_EMAIL_CONFIRM_BASE_FILENAME, TEMPLATE_EMAIL_BASE_PATH
from utils.emails import generate_context


class AccountAdapter(DefaultAccountAdapter):
    """ Extends allauth.DefaultAccountAdapter """

    @staticmethod
    def get_template_path(user, signup):
        """
        Return confirmation template path based on user types

        TODO: email subject prefix
        """
        email_template = f"{TEMPLATE_EMAIL_BASE_PATH}{TEMPLATE_EMAIL_CONFIRM_BASE_FILENAME}"

        return f"{email_template}_signup" if signup else email_template

    def send_confirmation_mail(self, request, emailconfirmation, signup):
        # set context
        current_user = emailconfirmation.email_address.user
        temp_path = f"auth/verify-account?key={emailconfirmation.key}"
        context = generate_context(request, temp_path)

        # send email
        email_template = self.get_template_path(current_user, signup)
        self.send_mail(email_template, emailconfirmation.email_address.email, context)
