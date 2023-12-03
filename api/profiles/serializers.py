from rest_framework import serializers
from profiles.models import Profile


class ProfileSerializer(serializers.ModelSerializer):

    email = serializers.CharField(source="user.email")

    class Meta:
        model = Profile
        exclude = ["user"]
        read_only_fields = ["last_modified_at"]
