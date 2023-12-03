from allauth.account.adapter import get_adapter
from allauth.account.forms import default_token_generator
from allauth.account.utils import user_pk_to_url_str
from dj_rest_auth.forms import AllAuthPasswordResetForm

from utils.emails import generate_context


class PasswordResetForm(AllAuthPasswordResetForm):

    def save(self, request, **kwargs):
        """ Send reset password email implementation """
        email = self.cleaned_data["email"]
        token_generator = kwargs.get("token_generator", default_token_generator)
        
        for user in self.users:
            # send the password reset email to related emails
            temp_key = token_generator.make_token(user)
            temp_path = f"auth/reset/confirm?uid={user_pk_to_url_str(user)}&key={temp_key}"
            email_template = "account/email/password_reset_key"
            context = generate_context(request, temp_path)
            get_adapter(request).send_mail(email_template, email, context)

        return self.cleaned_data["email"]
