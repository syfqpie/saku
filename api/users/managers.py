from django.apps import apps
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password

from allauth.account.models import EmailAddress


class UserManager(BaseUserManager):
    """ Base custom user manager based on BaseUserManager """

    use_in_migrations = True

    def _complete_create(self, user):
        assert not EmailAddress.objects.filter(user=user).exists()
        address = EmailAddress.objects.create(user=user, email=user.email, primary=True)
        address.send_confirmation()

    def _create_user(self, username, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not username:
            raise ValueError("The given username must be set")
    
        email = self.normalize_email(email)
        # Lookup the real model class from the global app registry so this
        # manager method can be used in migrations. This is fine because
        # managers are by definition working on the real model.
        GlobalUserModel = apps.get_model(
            self.model._meta.app_label, self.model._meta.object_name
        )
        username = GlobalUserModel.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user
    
    def create_user(self, username, email=None, password=None, **extra_fields):
        created_user = self._create_user(username, email, password, **extra_fields)
        self._complete_create(created_user)
        return created_user
