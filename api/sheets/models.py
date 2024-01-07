import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _


class Sheet(models.Model):
    id = models.UUIDField(_("id"), primary_key=True, editable=False, default=uuid.uuid4)
    title = models.CharField(_("title"), max_length=50, blank=True)
    items = models.JSONField(_("items"), default=dict)

    created_by = models.ForeignKey(
        "profiles.Profile",
        on_delete=models.CASCADE,
        related_name="sheets_created",
        verbose_name=_("sheet by")
    )
    created_at = models.DateTimeField(_("last modified at"), auto_now_add=True)
    last_modified_at = models.DateTimeField(_("last modified at"), auto_now=True)

    class Meta:
        ordering = ["last_modified_at"]

    def __str__(self):
        return f"[{self.id}] {self.title}"
