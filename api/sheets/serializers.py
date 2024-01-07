from rest_framework import serializers
from sheets.models import Sheet


class SheetItem(serializers.Serializer):
    item = serializers.CharField()
    amount = serializers.IntegerField()
    is_checked = serializers.BooleanField()


class SheetSerializer(serializers.ModelSerializer):

    items = SheetItem(many=True, required=False)

    class Meta:
        model = Sheet
        exclude = ["created_by"]
        read_only_fields = ["created_at", "last_modified_at"]
