from dj_rest_auth.serializers import PasswordResetSerializer as RestPasswordResetSerializer

from auth.forms import PasswordResetForm


class PasswordResetSerializer(RestPasswordResetSerializer):

    @property
    def password_reset_form_class(self):
        return PasswordResetForm
