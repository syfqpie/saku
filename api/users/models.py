import uuid

from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.base_user import AbstractBaseUser
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from users.managers import UserManager


class User(AbstractBaseUser):
    """ User model extended from abstract user """

    # Account information
    username_validator = UnicodeUsernameValidator()

    id = models.UUIDField(_("id"), primary_key=True, editable=False, default=uuid.uuid4)
    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    email = models.EmailField(_("email address"), unique=True, null=True)
    is_active = models.BooleanField(_("is active?"), default=True)

    # Log
    joined_at = models.DateTimeField(_("date joined"), default=timezone.now)
    verified_at = models.DateTimeField(_("date email veriried"), null=True)
    last_modified_at = models.DateTimeField(_("last modified at"), auto_now=True)

    # Override for createsuperuser
    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []
    objects = UserManager()

    class Meta:
        ordering = ["-joined_at"]
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        return self.username

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)
