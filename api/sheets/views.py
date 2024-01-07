import logging

from django.db.models.query import QuerySet
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from sheets.models import Sheet
from sheets.permissions import SheetOwnerOnlyPermission
from sheets.serializers import SheetSerializer


logger = logging.getLogger(__name__)


class SheetViewSet(viewsets.ModelViewSet):
    queryset = Sheet.objects.all()
    serializer_class = SheetSerializer
    permission_classes = (IsAuthenticated & SheetOwnerOnlyPermission,)

    def get_created_by(self, serializer):
        ctx = serializer.context
        user = ctx.get("request").user
        return {"created_by": user.related_profile}
    
    def get_queryset(self):
        assert self.queryset is not None, (
            "'%s' should either include a `queryset` attribute, "
            "or override the `get_queryset()` method."
            % self.__class__.__name__
        )

        queryset = self.queryset
        profile = self.request.user.related_profile

        if isinstance(queryset, QuerySet):
            # Ensure queryset is re-evaluated on each request.
            queryset = queryset.filter(created_by=profile)

        return queryset

    def perform_create(self, serializer):
        serializer.save(**self.get_created_by(serializer))
