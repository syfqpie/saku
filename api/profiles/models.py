import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _


class Profile(models.Model):
    id = models.UUIDField(_("id"), primary_key=True, editable=False, default=uuid.uuid4)
    user = models.OneToOneField(
        "users.User",
        on_delete=models.CASCADE,
        related_name="related_profile",
        verbose_name=_("profile of")
    )

    last_modified_at = models.DateTimeField(_("last modified at"), auto_now=True)

    class Meta:
        ordering = ["user"]

    def __str__(self):
        return self.user
