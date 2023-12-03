from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from auth import permissions
from profiles.models import Profile
from profiles.serializers import ProfileSerializer


class ProfileViewSet(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated & permissions.OwnerOnlyPermission,)

    @action(methods=["GET"], detail=False, url_path="get-attached")
    def get_attached_profile(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(user.related_profile, many=False)

        return Response(serializer.data)
