from rest_framework import serializers
from profiles.models import Profile


class ProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source="user.username")

    class Meta:
        model = Profile
        exclude = ["user"]
        read_only_fields = ["last_modified_at"]
