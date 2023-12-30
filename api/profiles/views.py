import logging

from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from auth import permissions
from profiles.logic import attach_profile_to_user
from profiles.models import Profile
from profiles.serializers import ProfileSerializer
from users.models import User


logger = logging.getLogger(__name__)


class ProfileViewSet(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated & permissions.OwnerOnlyPermission,)

    @action(methods=["GET"], detail=False, url_path="get-attached")
    def get_attached_profile(self, request, *args, **kwargs):
        user = request.user
        
        try:
            profile = user.related_profile
        except User.related_profile.RelatedObjectDoesNotExist:
            logger.warning(f"No profile attached found for username={user.username}")
            profile = attach_profile_to_user(user)

        serializer = self.get_serializer(profile, many=False)

        return Response(serializer.data)
